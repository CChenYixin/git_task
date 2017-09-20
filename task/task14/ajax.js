// 创建XMLHttpRequeat()，兼容ie

function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}


// XHR

var button = document.getElementsByTagName('button')[0];

var handler = function() {

    var xhr = createXHR();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                console.log(xhr.responseText);
            }else{
                console.log('Request was unsuccessful:' + xhr.status);
            }
        }
    };

    xhr.open('get','http://www.easy-mock.com/mock/59c1c4dfe0dc663341b0aff2/example/proxy',true);
    xhr.send(null);
};

button.addEventListener('click', handler);

var button = document.getElementsByTagName('button')[0],
    lock = false;

button.addEventListener('click',function(){
    if(lock){
        return;
    }else{
        lock = true;
        ajax({
            // code
            succes: function(){
                // code
                lock = false;
            },
            fail: function(){
                // code
                lock = false;
            }
        });
    }
});
