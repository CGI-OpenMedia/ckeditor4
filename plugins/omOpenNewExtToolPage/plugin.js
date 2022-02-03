CKEDITOR.plugins.add('omOpenNewExtToolPage',
{
    init: function (editor) {
        editor.addCommand('omOpenNewExtToolPage', {
            exec: function (editor) {
                
                OMWClientContext.Story.HandleOpenNewExtToolPageClick(0);
            },
            editorFocus: true
        });

        editor.ui.addButton('omOpenNewExtToolPage',
		{
		    // Toolbar button tooltip.
		    label: 'New',
		    // Reference to the plugin command name.
		    command: 'omOpenNewExtToolPage',
		    // Button's icon file path.
		    icon: this.path + 'icon1.png'
		});
    }
    
});
