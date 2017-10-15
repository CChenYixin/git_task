/**
 * 获取元素
 */

function $(selector){
    return  document.querySelector(selector);
}

/**
 * 对封装好的ajax进行调用
 */
// ajax({
//     url:'/html/music.json',
//     type:'GET',
//     // data:{
//     //     name:'chenyixin'
//     // },
//     dataType:'JSON',
//     async:true,
//     success:function(response,xml){
//         console.log(JSON.parse(response));
//         var list = JSON.parse(response);
//         getMusicList(list);
//     },
//     fail:function(status){
//         console.log('获取数据失败，状态码为'+status);
//     }
// });

var xhr = new XMLHttpRequest();
xhr.open('get', 'http://chenyixin.win/git_task/task/Jounetsu/app/html/index.html', true);
xhr.send();
xhr.onload = function() {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        var list = JSON.parse(xhr.responseText);
        getMusicList(list);
    }else{
        console.log('获取数据失败!');
    }
};



var musicList = [];
var currentIndex = 0;
var clock;
var audio = new Audio();
audio.autoplay = true;



/**
 * 获取音乐列表
 */

function getMusicList(list){
    musicList = list;
    loadMusic(list[currentIndex]);
}

/**
 * 加载音乐
 */

function loadMusic(musicObject){
    console.log('begin play',musicObject);
    $('.song-name').innerText = musicObject.title;
    $('.song-author').innerText = musicObject.author;
    $('.song-img').src = musicObject.img;
    $('.time-total').innerText = musicObject.time;

    audio.src = musicObject.src;
}



/**
 * 监听时间进度条
 */

audio.ontimeupdate = function(){
    var barWidth =$('.progress-total').offsetWidth;
    $('.progress-now').style.width = (this.currentTime / this.duration) * barWidth + 'px';
};

audio.onplay = function(){
    clock = setInterval(function(){
        var min = Math.floor(audio.currentTime / 60) + '';
        var sec = Math.floor(audio.currentTime) % 60 + '';
        min = min.length === 2 ? min : '0' + min;
        sec = sec.length === 2 ? sec : '0' + sec;
        $('.time-now').innerText = min + ':' + sec;
    },1000);
};

audio.onpause = function(){
  clearInterval(clock);
};

audio.onended = function(){
    currentIndex = (++currentIndex) % musicList.length;
    loadMusic(musicList[currentIndex]);
};

/**
 * 点击时间进度条跳转播放
 */

$('.progress-bar').onclick = function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width);
    audio.currentTime = audio.duration * percent;
};


/**
 * 监听播放按钮
 */

$('.playBtn').onclick = function(){
    if(audio.paused){
        audio.play();
        this.classList.remove('pauseStatus');
        this.classList.add('playStatus');

    }else{
        audio.pause();
        this.classList.remove('playStatus');
        this.classList.add('pauseStatus');
    }

};

/**
 * 监听上下一曲按钮
 */

$('.nextBtn').onclick = function(){
    currentIndex = (++currentIndex) % musicList.length;
    loadMusic(musicList[currentIndex]);
    getAlbums(musicList);
};

$('.prevBtn').onclick = function(){
    currentIndex = (musicList.length + --currentIndex) % musicList.length;
    loadMusic(musicList[currentIndex]);
    getAlbums(musicList);
};

/**
 * 专辑推荐
 */

 function randomSort(a,b) {
     return Math.random() > 0.5 ? -1 : 1;
 }

function getAlbums(list){
    var albumBox = $('.albums-box');
    var cloneBox = albumBox.cloneNode(true);
    console.log(cloneBox.children);

    var lis = [];
    for(var i=0;i<cloneBox.children.length;i++){
        lis.push((cloneBox.children)[i]);
    }


    albumBox.innerHTML = '';
    var newArray = lis.sort(randomSort);
    for (var j=0,len=newArray.length; j<len; j++){
        albumBox.appendChild( newArray[j].cloneNode(true) );
    }

}
