// load required packages
var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

// initialize express
var app = express();

// serve files from "app" folder directly
app.use('/', express.static(path.join(__dirname, '/app')));

// the favicon!
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// serve index.html from app or what?????
app.use((req, res) => {
  console.log("Serving app/index.html");
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

module.exports = app;

// start server on port 3000
app.listen(3000, () => console.log('sis-frontend app listening on port 3000!'));