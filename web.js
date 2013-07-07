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

app.get('/', function(request, response) {
  streamFile('index.html', 'text/html', response);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
