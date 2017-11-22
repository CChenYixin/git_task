var $slider = $('.slide-imgs'),
    $slideItems = $slider.children(),
    $slideWidth = $slideItems.width(),
    $imgLength = $slideItems.length,
    $prevBtn = $('.prev'),
    $nextBtn = $('.next'),
    $bullet = $('.bullet li');


var curIdx = 0;
var isAnimate = false;


$nextBtn.on('click',function(e){
    e.preventDefault();
    nextPlay();
});

$prevBtn.on('click',function(e){
    e.preventDefault();
    prevPlay();
});

$bullet.on('click',function(){
    var idx = $(event.target).index();
    play(idx);
});


play(0);
autoPlay();


function nextPlay(){
    play((curIdx+1)%$imgLength);
    console.log('哈哈');
}
function prevPlay(){
    play(($imgLength + curIdx -1)%$imgLength);
}

function play(idx){
    console.log('idx：'+idx);
    console.log('curIdx:' +curIdx);
    if(isAnimate) return;
    isAnimate = true;

    $slideItems.eq(curIdx).fadeOut(500);
    $slideItems.eq(idx).fadeIn(500,function(){
        isAnimate = false;
    });

    curIdx = idx;
    setBullet();
}

function setBullet(){
    $('.bullet').children()
                .removeClass('active')
                .eq(curIdx)
                .addClass('active');
}

function stopAuto(){
    clearInterval(clock);
}

function autoPlay(){
    clock = setInterval(function(){
        nextPlay();
    }, 2000);
}
