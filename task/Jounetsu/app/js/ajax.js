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
