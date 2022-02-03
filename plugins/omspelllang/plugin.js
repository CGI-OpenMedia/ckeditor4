CKEDITOR.plugins.add('omspelllang',
{
    init: function (editor) {
        editor.addCommand('omspelllang', new CKEDITOR.dialogCommand('omspelllang'));

        editor.ui.addButton('omspelllang',
		{
		    // Toolbar button tooltip.
		    label: 'Language',
		    // Reference to the plugin command name.
		    command: 'omspelllang',
		    // Button's icon file path.
		    icon: this.path + 'images/icon1.png'
		});


        var selectedLanguage = '';

        CKEDITOR.dialog.add('omspelllang', function (editor) {
            return {
                title: 'Spellcheck',
                minWidth: 200,
                minHeight: 100,
                contents:
                [
                    {
                        id: 'general',
                        label: 'Spellcheck',
                        elements:
                        [
                            // UI elements of the Insert Date Time tab.
                            {
                                id: 'content',
                                type: 'html',
                                html: '<ul class="ck-editor-plugin-insert-date-time"></ul>'
                            }
                        ]
                    }
                ],
                onOk: function () {
                    OMWClientContext.Story.DefaultLang = selectedLanguage;
                    editor.fire('SpellingLang');
                },
                onShow: function () {
                    var sLang = '#' + OMWClientContext.Story.DefaultLang;
                    var dialog = this;

                    var elements = [];
                    var content = this.getContentElement('general', 'content');

                    var id = content.domId;
                    var $ul = $('#' + id);

                    var items = '';
                    var date = new Date();

                    items += '<li id="en_GB">' + 'English' + '</li>';
                    items += '<li id="de_DE">' + 'German' + '</li>';

                    $ul.html(items);

                    if (sLang) {
                        $ul.find(sLang).addClass('ck-editor-plugin-insert-date-time-selected');
                    }

                    $ul.find('li').on('click', function (e) {
                        selectedLanguage = e.target.id;
                        $ul.find('li').removeClass('ck-editor-plugin-insert-date-time-selected');
                        $(e.target).addClass('ck-editor-plugin-insert-date-time-selected');
                    });

                    $ul.find('li').on('dblclick', function (e) {
                        selectedLanguage = e.target.id;
                        OMWClientContext.Story.DefaultLang = selectedLanguage;
                        //Close dialog
                        CKEDITOR.dialog.getCurrent().hide();
                        editor.fire('SpellingLang');
                    });

                }
            };
        });
    }
});
