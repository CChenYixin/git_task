$(document).ready(function(){
    var scroll_pos = 0;
    var rgbaColor = 'rgba(' + 0 +','+ 0 +','+0+',0.2)';
    $(document).scroll(function() {
        scroll_pos = $(this).scrollTop();
        if(scroll_pos > 210) {
            $("#nav").css('background-color', '#000');
        } else {
            $("#nav").css('background-color',rgbaColor);
        }
    });
});
