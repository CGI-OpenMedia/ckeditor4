/*
*
* This Plugin streamlines editing issues (lost of font style in some situations) caused by RTF<->HTML conversion 
* and the sometimes irregular HTML produced by it.
* It is a lgitimate place to implement support of further text editing needed use cases.
*
*/

(function () {
    jQuery.uaMatch = function (ua) {
        ua = ua.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    if (!jQuery.browser) {
        var
        matched = jQuery.uaMatch(navigator.userAgent),
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        jQuery.browser = browser;
    }

    var contentPasted = false;
    CKEDITOR.plugins.add('omwsearch', {
        init: function (editor) {
            editor.on('selectionChange', function (e) {
                if (jQuery.browser.mozilla) {
                    if (contentPasted) {
                        e.stopPropagation();
                        contentPasted = false;
                    }
                    else {
                        var range = getRange(editor);
                        replaceRangeWithClosestEditableRoot(range, editor);
                    }
                }
            });
            editor.on('contentDom', function () {
                // Get font and set it as default
                setDefaultFont(editor);
            });
            editor.on('paste', function () {
                contentPasted = true;
            });
        }
    });

    function refreshContent(editor) {
        dataRefreshed = true;
        var data = editor.getData();

        editor.setData(data);
    }

    var dataRefreshed = false;
    function setDefaultFont(editor) {
        if (!dataRefreshed) {

            var size = $('#hdnFontSize').val();
            var face = $('#hdnFontFace').val();

            var css = "body{font-family:'" + face + "'; font-size:" + size + ";}";

            editor.document.$.styleSheets = _.filter(editor.document.$.styleSheets, function (s) {
                return s.cssRules[0].selectorText != "body"
            })

            editor.document.appendStyleText(css);

            if (_.find(editor.document.$.styleSheets, function (s) {
                return s.cssRules[0].selectorText != "body p:first-child"
            })) {
                editor.document.appendStyleText("body p:first-child{ margin: 0px; }");
            }

            //editor.dataProcessor.htmlFilter.addRules({
            //    elements: {
            //        div: function (e) { e.attributes.style = "font-family:'" + face + "'; font-size:" + size + ";"; },
            //        p: function (e) { e.attributes.style = "font-family:'" + face + "'; font-size:" + size + ";"; }
            //    }
            //});

            refreshContent(editor);
        }
        else {
            dataRefreshed = false;
        }
    }

    function replaceRangeWithClosestEditableRoot(range, editor) {

        if (range.startContainer) {

            var name = range.startContainer.$.nodeName;
            if (name == "p" || name == "P" || name == "DIV" || name == "div"
                || name == "BR" || name == "br" || name == "BODY" || name == "body") {
                var spans = range.startContainer.getElementsByTag('span');
                var node;
                if (spans.count() > 0) {
                    node = spans.getItem(spans.count() - 1);
                    if (!range.root.equals(node)) {
                        var range1 = editor.createRange();
                        range1.moveToElementEditEnd(node);
                        editor.getSelection().selectRanges([range1]);

                        // console.log('range changed');
                    }
                }
                else {
                    //Add span with default size and font-style
                }
            }
        }
    }

    function getRange(editor) {
        // Get the selection ranges
        var ranges = editor.getSelection().getRanges(true);

        // Delete the contents of all ranges except the first one
        for (var i = ranges.length - 1; i > 0; i--) {
            ranges[i].deleteContents();
        }

        // Return the first range
        return ranges[0];
    };
})();
