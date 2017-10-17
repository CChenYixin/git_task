/**
 * 获取元素
 */

function $(selector){
    return  document.querySelector(selector);
}

/**
 * 发送ajax获取歌曲资源
 */

var xhr = new XMLHttpRequest();
xhr.open('get', 'http://chenyixin.win/git_task/task/Jounetsu/app/html/music.json', true);
// xhr.open('get', '/html/music.json', true);
xhr.send();
xhr.onload = function() {
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
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
    getLyric(list[currentIndex].lyric);
}

/**
 * 加载音乐
 */

function loadMusic(musicObject){
    console.log('成功获取歌曲资源并开始加载！');
    $('.song-name').innerText = musicObject.title;
    $('.song-author').innerText = musicObject.author;
    $('.song-img').src = musicObject.img;
    $('.time-total').innerText = musicObject.time;
    audio.src = musicObject.src;
}

/**
 * 获取歌词
 */

function getLyric(url){
    url = 'http://chenyixin.win/git_task/task/Jounetsu/app' + url;
    var request = new XMLHttpRequest();
    request.open('GET',url,true);
    request.send();
    request.onload = function(){
        if ((request.status >= 200 && request.status < 300) || request.status == 304) {
            var lyric = request.responseText;
            console.log('成功获取歌词资源并开始加载！');
            loadMusicLyric(lyric);
        }else{
            console.log('获取歌词数据失败!');
        }
    };
}

/**
 * 解析歌词
 */

function loadMusicLyric(lyricObject){
    // 获得纯歌词
    var lyricVal = lyricObject.replace(/\[\d\d:\d\d.\d\d\d]/g,""),
        lyricArray = lyricVal.split('\n'),
        lyricTime = [],
        lyricHtml = '';

    // 获取时间轴
    lyricObject.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){
        var min = arguments[1],
            sec = arguments[2],
            realMin = min * 60 + sec;
        lyricTime.push(realMin);
    });

    // 将歌词放入容器
    for(var i=0;i<lyricTime.length;i++){
        lyricHtml += '<p class=\"lyric-line\" data-timeline=\"lyricTime[i]\">' + lyricArray[i] + '</p>';
    }
    $('.lyric-area').innerHTML = lyricHtml;

    // console.log(lyricVal);
    // console.log(lyricArray);
}

/**
 * 歌词滚动
 */

// function lyricMove(totalTime,currentTime){
// }


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
    getLyric(musicList[currentIndex].lyric);
    getAlbums(musicList);
};

$('.prevBtn').onclick = function(){
    currentIndex = (musicList.length + --currentIndex) % musicList.length;
    loadMusic(musicList[currentIndex]);
    getLyric(musicList[currentIndex].lyric);
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
    // console.log(cloneBox.children);

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
