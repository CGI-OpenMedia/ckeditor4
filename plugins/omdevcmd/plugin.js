CKEDITOR.plugins.add('omdevcmd',
{
    init: function (editor) {
        editor.addCommand('omdevcmd', {
            exec: function (editor) {
                
                startDevCmdPopUp(editor);
            },
            editorFocus: true
        });

        editor.ui.addButton('omdevcmd',
		{
		    // Toolbar button tooltip.
		    label: 'Device Command',
		    // Reference to the plugin command name.
		    command: 'omdevcmd',
		    // Button's icon file path.
		    icon: this.path + 'images/icon1.png'
		});

        var omdevcmd_HandleAfterInsertHtml = false;
        editor.on('afterInsertHtml',
		    function (event) {
		        if (!omdevcmd_HandleAfterInsertHtml) return;
		        omdevcmd_HandleAfterInsertHtml = false;
		        setTimeout(function () {
		            OMWClientContext.Story.NewDevCmdSaveStory();
		        }, 100);
		    });

        var startDevCmdPopUp = function (editor) {
            angular.element($('#devCmdDiv')).scope().onDevCmdsBtn(function (result) {
                //Function that is executed when dialog is closed
                
                if (editor) {
                    //Check if result exists and if yes append it to the ckeditor text
                    if (result) {
                        OMWClientContext.Story.CKEditorIsUpdating = true;
                        editor.removeListener('change');
                        omdevcmd_HandleAfterInsertHtml = true;
                        resetCursorPosition(editor);
                        editor.insertHtml(result);
                    }
                    else {
                        //Return focus to editor
                        editor.focus();
                    }
                }
            });
        }

        // clears current text selection and sets the cursor position to the start of this selection
        function resetCursorPosition(editor) {
            var ranges = editor.getSelection().getRanges();
            var oldRange = ranges[0];

            if (oldRange.startContainer.$ == oldRange.endContainer.$
                && oldRange.startOffset == oldRange.endOffset) {
                // do nothing if there is no text selection
                return;
            }

            var newRange = editor.createRange();
            newRange.setStart(oldRange.startContainer, oldRange.startOffset);
            editor.getSelection().selectRanges([newRange]);
        }

        editor.on('instanceReady', function () {
            if (!_.get(OMWClientContext, 'Story.Story.CanChangeMachineCommands')) {
                editor.commands.omdevcmd.setState(CKEDITOR.TRISTATE_DISABLED);
            }
        });
    }
});