"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var serveStatic = require("serve-static");
var port = process.env.PORT || 10000;
var app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(path.join(__dirname, '..')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});
app.listen(port, function () {
    console.log('server listening at port' + port + '///');
});
