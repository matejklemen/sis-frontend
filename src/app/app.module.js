console.log("hello")
console.log("...")
console.log("okey")

// 
var express = require('express');
var app = express();
var index = require("./index.ctrl")

app.use('/', index);

module.exports = app;