var express = require('express');
var app = express();
var http = require('http').Server(app); // http server

// routing http requests from display.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/server.js', function(req, res, next) {
    return res.sendFile(__dirname + '/server.js');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})