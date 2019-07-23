$(function() {
    var editElements = {};
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
        popover: {
            air: [
                ['style', ['style']],
                ['color', ['color']],
                ['font', ['bold', 'italic']],
                ['para', ['ul', 'paragraph']],
                ['insert', ['link','image', 'doc', 'video']],
                ['table', ['table']]
            ]
        },
        placeholder: 'Click here to enter content.',
        callbacks: {
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
                        $('#save').delay(100).fadeOut();
                    });
                }
            }
        },
    });
});
