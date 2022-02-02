CKEDITOR.plugins.add('advIconSize',
    {
        init: function (editor) {

            const line = '_1line.';

            function getAdvIcons() {
                return editor.document.find('.OpenMediaInsert[src*="InsertsIcons"]').$
            }

            function btnDisable() {
                editor.commands.advIconSize.setState(CKEDITOR.TRISTATE_DISABLED);
            }

            function changeSize() {

                const isBtnActive = editor.commands.advIconSize.state == 1;

                try {
                    // stop to record DOM operations
                    editor.undoManager.lock()
                    // start update
                    getAdvIcons().forEach(function (e) {
                        if (isBtnActive && e.src.indexOf(line) != -1) {
                            // if button is active and the image is already reduced
                            return;
                        }

                        e.src = isBtnActive
                            ? e.src.replace(/.([^.]+)$/, line + '$1')
                            : e.src.replace(line, ".")
                    });
                }
                finally {
                    // unlock DOM operations
                    editor.undoManager.unlock()
                }
            }

            editor.on('change', function () {
                if (getAdvIcons().length == 0)
                    btnDisable();
                else
                    changeSize();
            });

            editor.on('instanceReady', function () {
                if (getAdvIcons().length == 0)
                    btnDisable();
            });

            editor.addCommand('advIconSize', {
                editorFocus: false,
                exec: function () {
                    this.toggleState();
                    changeSize();
                }
            });

            editor.ui.addButton('advIconSize',
                {
                    label: 'Reduce Item Icons',
                    command: 'advIconSize',
                    icon: this.path + 'icon.png'
                });
        }
    });