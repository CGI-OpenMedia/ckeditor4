(function () {

    CKEDITOR.plugins.add('omwpasteobject', {
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

                var contextMenuElement = null;

                editor.addMenuGroup('mediaInsertGroup', -1);
                addIconMenuItem('mediaInsertIcon', OMWClientContext.user_msg.Open, function () { OMWClientContext.Story.HandleIconDblClick(contextMenuElement); });
                addIconMenuItem('mediaInsertIconCtrl', OMWClientContext.user_msg.OpenInStack, function () { OMWClientContext.Story.HandleIconDblClickWithCtrl(contextMenuElement); });
                addIconMenuItem('mediaInsertMainArea', OMWClientContext.user_msg.OpenMeta, function () { OMWClientContext.Story.HandleMainAreaDblClick(contextMenuElement); });

                editor.contextMenu.addListener(function (element) {
                    if (element.$.tagName === "IMG") {
                        contextMenuElement = element;
                        editor.contextMenu.items.splice(editor.contextMenu.items.length - 1);
                        return {
                            mediaInsertIcon: CKEDITOR.TRISTATE_OFF,
                            mediaInsertIconCtrl: CKEDITOR.TRISTATE_OFF,
                            mediaInsertMainArea: CKEDITOR.TRISTATE_OFF,
                            mediaInsertMainAreaCtrl: CKEDITOR.TRISTATE_OFF
                        };
                    }

                    contextMenuElement = null;

                    return { pasteObj: CKEDITOR.TRISTATE_OFF };
                });

                function addIconMenuItem(id, label, onClick) {
                    editor.addMenuItem(id, {
                        label: label,
                        group: 'mediaInsertGroup',
                        onClick: onClick
                    });
                }
            }
        }
    });
})();
