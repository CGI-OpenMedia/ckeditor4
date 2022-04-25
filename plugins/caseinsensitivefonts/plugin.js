/// <reference path="../../../../scripts/lodash.js" />

/*
 * This plugin makes ckeditor insensitive to the letter cases in the configured font names.
 * The gembox convertor changes all letters of font names to lowercase.
 * The plugin is written to solve this problem caused by HTML<->RTF conversion.
*/

CKEDITOR.plugins.add('caseinsensitivefonts',
    {
        beforeInit: function (editor) {

            var faceAttribute = 'face';
            var fontFamilyStyle = 'font-family';

            var configuredFontNames = editor.config.font_names.split(';');

            function findConfiguredFontName(fontName) {

                if (!fontName)
                    return fontName;

                var configuredFont = _.find(configuredFontNames, function (element) {
                    return element.toLowerCase() === fontName.toLowerCase();
                });

                return configuredFont || fontName;
            }

            CKEDITOR.config.font_defaultLabel = findConfiguredFontName(CKEDITOR.config.font_defaultLabel);

            // override ckeditor functions

            if (!CKEDITOR.tools._parseCssText) {
                // parseCssText is used by CKEDITOR to get font-family style
                CKEDITOR.tools._parseCssText = CKEDITOR.tools.parseCssText;
            }

            if (!CKEDITOR.dom.element.prototype._getAttribute) {
                // getAttribute is used by CKEDITOR to get face attribute
                CKEDITOR.dom.element.prototype._getAttribute = CKEDITOR.dom.element.prototype.getAttribute;
            }

            // get face attribute
            CKEDITOR.dom.element.prototype.getAttribute = function (attribute) {

                var value = this._getAttribute(attribute);

                if (attribute == faceAttribute) {
                    value = findConfiguredFontName(value);
                }

                return value;
            }

            // get font-family style         
            CKEDITOR.tools.parseCssText = function (styleText, normalize, nativeNormalize) {

                var value = CKEDITOR.tools._parseCssText(styleText, normalize, nativeNormalize);

                if (fontFamilyStyle in value) {
                    value[fontFamilyStyle] = findConfiguredFontName(value[fontFamilyStyle]);
                }

                return value;
            }
        }
    });