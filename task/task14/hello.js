function ajax(options){

    // 传入默认为对象
    options = options || {};

    // 默认为 GET 请求
    options.type = (options.type || 'GET').toUpperCase();

    // 返回值类型默认为 JSON
    options.dataType = options.dataType || 'JSON';

    // 默认为异步请求
    options.async = options.async || true;

    // 对需要传入的参数进行处理
    var params = getParams(options.data);
    // console.log(params);

    var xhr;

    // 创建一个 ajax 请求

    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            var status = xhr.status;
            if(status >= 200 && status < 300 || status === 304){
                if(options.success){
                    options.success(xhr.responseText,xhr.responseXML);
                }
            }else{
                if(options.fail){
                    options.fail(status);
                }
            }
        }
    };

    if(options.type === 'GET'){
        xhr.open('GET',options.url + '?' + params,options.async);
        xhr.send();
    }else if (options.type === 'POST'){
        // 启动请求
        xhr.open('POST',options.url,options.async);

        // POST 设置请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        // 发送请求
        xhr.send(params);
    }
}


// 参数处理函数

function getParams(data){
    var arr = [];

    for(var param in data){
        arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
    }
    // console.log(arr);
    arr.push(('randomNumber=' + Math.random()).replace('.'));
    // console.log(arr);
    return arr.join('&');
}


// 调用

var handler = function(){
    if(lock){
        return;
    }else{
        lock = true;
        ajax({
            url:'http://www.easy-mock.com/mock/59c1c4dfe0dc663341b0aff2/example/proxy',
            type: 'GET',
            data:{
                name:'chenyixin',
                age:20
            },
            dataType:"JSON",
            async:false,
            success:function(response,xml){
                var dataArr = JSON.parse(response).data.news,
                    ul = document.getElementsByClassName('showcontent')[0],
                    len = dataArr.length;

                var str ='';

                for(var i= 0;i< len;i++){
                    // var div = document.createElement('div');
                    // div.innerHTML = dataArr[i].medium_title;
                    // console.log(div);
                    // showContent.appendChild(div);
                    //
                    str += '<li>' + dataArr[i].medium_title + '</li>';
                }

                ul.innerHTML +=  str;
                lock = false;
            },
            fail:function(status){
                console.log('状态码为'+ status);
            }
        });
    }
};


var button = document.getElementsByTagName('button')[0],
    lock = false;

handler();
button.addEventListener('click',handler);


// function handler1(response,xml){
//     var data = JSON.parse(response).data.news;
//     var showContent = document.getElementsByClassName('showcontent')[0];
//
//     for(var keys in data){
//         var div = document.createElement('div');
//         div.innerHTML = data[medium_title];
//         showContent.appendChild(div);
//     }
// }
