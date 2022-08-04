/*
* !!!important: the plugin should be checked for relevance and removed if not relevant
* 
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

            editor.on('paste', function () {
                contentPasted = true;
            });
        }
    });

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
