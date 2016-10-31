$(document).ready(function () {
    $("#resize-demo").click(function(){
        window.resizeTo(960, 540);
    });
    $("#main-panel").fadeIn(1000);


        function toggleLabel() {
            var input = $(this);
            setTimeout(function () {
                var def = input.attr('title');
                if (!input.val() || (input.val() == def)) {
                    input.prev('span').css('visibility', '');
                    if (def) {
                        var dummy = $('<label></label>').text(def).css('visibility', 'hidden').appendTo('body');
                        input.prev('span').css('margin-left', dummy.width() + 3 + 'px');
                        dummy.remove();
                    }
                } else {
                    input.prev('span').css('visibility', 'hidden');
                }
            }, 0); 
        };

        function resetField() {
            var def = $(this).attr('title');
            if (!$(this).val() || ($(this).val() == def)) {
                $(this).val(def);
                $(this).prev('span').css('visibility', '');
            }
        };

        $('.inline-labels input, .inline-labels textarea').bind('keydown', toggleLabel);
        $('.inline-labelsinput, .inline-labelstextarea').bind('paste', toggleLabel);
        $('.inline-labels select').bind('change', toggleLabel);

        $('.inline-labels input, .inline-labels textarea').bind('focusin', function () {
            $(this).prev('span').css('color', '#ccc');
        });
        $('.inline-labels input, .inline-labels textarea').bind('focusout', function () {
            $(this).prev('span').css('color', '#999');
        });

        $(function () {
            $('.inline-labels input, .inline-labels textarea').each(function () { toggleLabel.call(this); });
        });


});