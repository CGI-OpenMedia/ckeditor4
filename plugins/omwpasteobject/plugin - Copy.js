(function () {

    CKEDITOR.plugins.add('pasteobject', {
        init: function (editor) {
            if (editor.contextMenu) {
                editor.addMenuGroup('pasteObjGroup', -1);
                editor.addMenuItem('pasteObj', {
                    label: 'Paste object',
                    group: 'pasteObjGroup',
                    onClick: function (e) {
                        //Insert html in this position
                        if (OMWClientContext.Story.PasteObjInStoryText) {
                        	var markup = OMWClientContext.Story.PasteObjInStoryText()
                        	if(!markup || !markup.length) {
                        		return;
                        	}
                        	editor.insertHtml(markup);
                        }
                    }
                });

                editor.contextMenu.addListener(function (element) {
                    return { pasteObj: CKEDITOR.TRISTATE_OFF };
                });
            }
        }
    });
})();
