app.get('/getNews', function (req, res) {
    var pos = req.query.index;
    var len = req.query.length;

    var data = [];
    for(var i=0; i<len; i++){
        data.push('内容'+(parseInt(pos)+i));
    }

    res.send(data);
});
