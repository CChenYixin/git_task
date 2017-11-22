
var $slider = $('.slide-imgs'),
    $imgLength = $slider.children().length,
    $slideWidth = $('.slide-imgs li').width(),
    $prevBtn = $('.prev'),
    $nextBtn = $('.next'),
    $bullet = $('.bullet li');


var $firstImg =  $('.slide-imgs li').first(),
    $lastImg = $('.slide-imgs li').last();

var isAnimate = false,
    pageIndex = 0;


    // 复制第一张和最后一张图片并添加进DOM
    $slider.prepend($lastImg.clone());
    $slider.append($firstImg.clone());

    // 根据图片数量设置 ul 的宽度并把第一张图片设置在可视区
    $slider.width( $slideWidth * $slider.children().length );
    $slider.css({left:'-=' + $slideWidth + 'px'});


$nextBtn.on('click',function(e){
    e.preventDefault();
    nextPlay();
});
$prevBtn.on('click',function(e){
    e.preventDefault();
    prevPlay();
});

$bullet.on('click',function(){
    var $index = $(event.target).index();
    if($index>pageIndex){
        nextPlay($index-pageIndex);
    }else if($index<pageIndex){
        prevPlay(pageIndex-$index);
    }
});

function nextPlay(n){
    var idx = n || 1;
    if(isAnimate) return;
    isAnimate = true;

    $slider.animate({
        left: '-=' + $slideWidth * idx + 'px'
    },1000,function(){
        pageIndex = pageIndex + idx;
        if(pageIndex === $imgLength){
            $slider.css('left','-' + $slideWidth + 'px');
            pageIndex = 0;
        }
        isAnimate = false;
        bullet();
    });

}
function prevPlay(n){
    var idx = n || 1;
    if(isAnimate) return;
    isAnimate = true;

    $slider.animate({
        left: '+=' + $slideWidth * idx + 'px'
    },1000,function(){
        pageIndex = pageIndex - idx;
        if(pageIndex < 0){
            $slider.css('left','-' + $slideWidth * $imgLength + 'px');
            pageIndex = $imgLength - 1;
        }
        isAnimate = false;
        bullet();
    });

}

function bullet(){
    $('.bullet').children()
                .removeClass('active')
                .eq(pageIndex)
                .addClass('active');
}


var timer = setInterval(function(){
    nextPlay();
},2000);

$slider.hover(function(){
    clearInterval(timer);
},function(){
    timer = setInterval(function(){
        nextPlay();
    },2000);
});
