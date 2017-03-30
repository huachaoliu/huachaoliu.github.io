var express = require('express')
    , path = require('path')
    , bodyParser = require('body-parser')
    , serveStatic = require('serve-static')
    , app = express()
    , port = process.env.PORT || 10000;

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(serveStatic(path.join(__dirname, '..')));

app.get('/', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../index.html'));
})

app.listen(port, function () {
    console.log('server listening at port ' + port + ' ...');
});