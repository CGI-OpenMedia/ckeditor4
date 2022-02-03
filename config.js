/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.allowedContent = true;
    config.fontSize_sizes = '8/8pt;9/9pt;10/10pt;11/11pt;12/12pt;14/14pt;16/16pt;18/18pt;20/20pt;22/22pt;24/24pt;26/26pt;28/28pt;36/36pt;48/48pt';
    //config.font_names = 'Segoe UI/Segoe UI;' + config.font_names;
    //config.fillEmptyBlocks = true;
    config.disableNativeSpellChecker = false;
    config.entities_greek = false;
    config.entities_latin = false;
    config.removePlugins = 'elementspath,magicline';
    config.extraPlugins = 'autolink';
    config.tabSpaces = 4;
    // linl configuration
    config.linkShowAdvancedTab = false;
    config.linkShowTargetTab = false;
    // font configuration
    config.font_names = 'Arial;Calibri;Comic Sans MS;Courier New;Georgia;Harrington;Lucida Sans Unicode;Mistral;Segoe UI;SimSun;Tahoma;Times New Roman;Trebuchet MS;Verdana;Vivaldi;'
    config.font_style = { element: "font", attributes: { face: "#(family)" }, overrides: [{ element: "font", attributes: { face: null } }] };

    // keep fullPage prop equal to True to always send ckeditor content to the server as a full HTML page (including <html>, <head>, and <body>)
    config.fullPage = true;
 
    // important: when Microsoft.Exchange cenvertor is used, keep enterMode prop equal to CKEDITOR.ENTER_DIV. The enterMode sets the behavior of the Enter key.
    // important: when CKEDITOR.ENTER_P is used, Microsoft.Exchange creates an extra new line characters for each paragraph (affects the insert positions)
    // important: when Microsoft.Exchange converts HTML to RTF and back to HTML it replaces all paragraphs with divs
    config.enterMode = CKEDITOR.ENTER_DIV;
};