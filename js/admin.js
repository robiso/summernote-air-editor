$(function() {
    var extendedToolbarVisible = false,
        MoreButton = function (context) {
            var ui = $.summernote.ui;

            // create button
            var button = ui.button({
                contents: '<i class="fa fa-angle-right"/>',
                click: function () {
                    // invoke insertText method with 'hello' on editor module.
                    if(extendedToolbarVisible) {
                        $(".btn-group.note-color").hide();
                        $(".btn-group.note-para").hide();
                        $(".btn-group.note-insert button[data-original-title='Document']").hide();
                        $(".btn-group.note-insert button[data-original-title='Video']").hide();
                        $(".btn-group.note-table").hide();
                        $(".btn-group.note-misc").hide();

                        $(".btn-group.note-show button i").removeClass("fa-angle-left").addClass("fa-angle-right");
                    } else {
                        $(".btn-group.note-color").show();
                        $(".btn-group.note-para").show();
                        $(".btn-group.note-insert button[data-original-title='Document']").show();
                        $(".btn-group.note-insert button[data-original-title='Video']").show();
                        $(".btn-group.note-table").show();
                        $(".btn-group.note-misc").show();

                        $(".btn-group.note-show button i").removeClass("fa-angle-right").addClass("fa-angle-left");
                    }
                    extendedToolbarVisible = !extendedToolbarVisible;
                }
            });

            return button.render();   // return button as jquery object
        },
        editElements = {};
    $('.editable').summernote({
        airMode: true,
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['fontsize', 'color']],
            ['para', ['paragraph']],
            ['insert', ['link','image', 'doc', 'video']], // image and doc are customized buttons
            ['table', ['table']],
            ['misc', ['codeview']],
        ],
        buttons: {
            more: MoreButton
        },
        popover: {
            air: [
                ['style', ['style', 'fontsize']],
                ['color', ['color']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['para', ['ul', 'paragraph']],
                ['insert', ['link', 'image', 'doc', 'video']],
                ['table', ['table']],
                ['misc', ['codeview']],
                ['show', ['more']]
            ]
        },
        placeholder: 'Click here to enter content.',
        callbacks: {
            onInit: function() {
                $(".btn-group.note-color").hide();
                $(".btn-group.note-para").hide();
                $(".btn-group.note-insert button[data-original-title='Document']").hide();
                $(".btn-group.note-insert button[data-original-title='Video']").hide();
                $(".btn-group.note-table").hide();
                $(".btn-group.note-misc").hide();
            },
            onChange: function(contents, $editable) {
                editElements[$(this).attr('id')] = contents;
            },
            onBlur: function() {
                if (editElements[$(this).attr('id')]!=undefined) {
                    var id = $(this).attr('id');
                    var content = editElements[$(this).attr('id')];
                    var target = ($(this).attr('data-target')!=undefined) ? $(this).attr('data-target'):'pages';
                    editElements[$(this).attr('id')] = undefined;
                    $.post("",{
                        fieldname: id,
                        content: content,
                        target: target,
                        token: token,
                    })
                    .done(function() {
                        $("#save").show();
                        $('#save').delay(100).hide();
                    });
                }
            }
        },
    });
});
