var express = require('express'),
fs = require('fs'),
path = require('path'),
util = require('util');

var app = express.createServer(express.logger());

var streamFile = function(name, mimeType, response) {
  var filePath = path.join(__dirname, name);

  var stat = fs.statSync(filePath);

  response.writeHead(200, {
    'Content-Type': mimeType,
    'Content-Length': stat.size
  });

  var stream = fs.createReadStream(filePath, {encoding: 'utf-8'});

  util.pump(stream, response);
};

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log("Listening on " + port);
});
