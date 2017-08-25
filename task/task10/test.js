var prod = {
    name: '女装',
    styles: ['短款', '冬季', '春装']
};



function getTpl(data){
    var newString = '<dl class="product"><dt>'+ data.name +'</dt>',
        len = data.styles.length;
    for (var i = 0;i < len;i++) {
        newString += '<dd>'+ data.styles[i] +'</dd>';
    }

    newString += '</dl>';
    return newString;
}


var result = getTpl(prod);


function isPalindrome (str) {
    if ( !str || typeof str !== 'string') {
        alert('请输入字符串');
        return ;
    }

    var reverseStr = str.split('').reverse().join('');
    if ( reverseStr === str) {
        console.log('true');
    }else {
        console.log('false');
    }
}

var o1 = null;
var o2 = 'heeeeee';
var o3 = 'zxccxz';

isPalindrome(o1);
isPalindrome(o2);
isPalindrome(o3);


function maxChar(str){
    if ( !str || typeof str !== 'string') {
        alert('请输入字符串');
        return ;
    }

    var dict = {},
        count = 0,
        maxChar;
    for (var i = 0; i < str.length; i++) {
        if (dict[str[i]]) {
            ++ dict[str[i]];
        }else {
            dict[str[i]]=1;
        }
    }
    console.dir(dict);

    for(var key in dict) {
        if (dict[key] > count) {
            count = dict[key];
            maxChar = key;
        }
    }

    console.log(count,maxChar);

}

var o4 = 'sbdkjakjfgakjfbksakfskjhaskjhdaaaaaaaaaaa';
maxChar(o4);


function camelize(str,separator){
    if ( !separator) {
        alert('请输入要替换的分割符');
        return ;
    }

    var arrStr = str.split(separator),
        result = '';

    for (var i = 0; i < arrStr.length; i++) {
        var word = arrStr[i];
        var upperWords = word.charAt(0).toUpperCase() + word.slice(1);
        result += upperWords ;
    }
    result = result.charAt(0).toLowerCase() + result.slice(1);
    return result;
}

var testString = "list-style-image";
camelize(testString,'-');
var testString2 = "list+style+image";
camelize(testString,'+');

function ucFirst(str) {
    var result = '';
    if ( !str || typeof str !== 'string') {
        alert('请输入字符串');
        return ;
    }
    result = str.charAt(0).toUpperCase() + str.slice(1);
    return result;
}

var str = 'hello';
ucFirst(str);



function truncate(str,num){
    var len = str.length;
    if (len <= num ) {
        return str;
    }else{
        var result = str.split('');
        result.splice(num,len-num,'....');
        return result.join('');
    }
}

var str = "hello, this is hunger valley";
console.log(truncate(str,10));
