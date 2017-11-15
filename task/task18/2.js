var img = document.getElementsByTagName('img'),
    imgNum = document.getElementsByTagName('img').length,
    defaultSrc = img[1].getAttribute("src");

var n = 0;

window.addEventListener('scroll', function() {
    // lazyload();
    throttle(lazyload,this);
});

lazyload();

function lazyload(){
    // console.log(1);
    var seeHight = document.documentElement.clientHeight,
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    for(var i = n; i < imgNum ;i++){
        if(img[i].offsetTop < seeHight + scrollTop){
            console.log('true');
            if(img[i].getAttribute("src") === defaultSrc){
                img[i].src = img[i].getAttribute('data-src');
            }
            n = i + 1;
        }

    }
}

function throttle(method,context){
    clearTimeout(method.tId);

    method.tId = setTimeout(function(){
        method.call(context);
    },100);
}
