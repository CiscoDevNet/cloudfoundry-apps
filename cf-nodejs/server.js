/*
var appdynamics = require("appdynamics").profile({
  applicationName: <set this value to override the value given by buildpack>,
  tierName: <set this value to override the value given by buildpack>>,
  nodeName: <set this value to override the value given by buildpack>>,
  debug: <set to true for debug logging>  
});
*/

var appdynamics = require("appdynamics").profile({});
var fs = require('fs')
var child_process = require('child_process');
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello, World!');
});

app.get('/config', function(req, res) {
  child_process.exec('cat /tmp/appd/*/*.json', {}, function(err, stdout, stderr) {
    console.log(err, stdout, stderr);
    if (err) {
      res.send(err);
    }
    res.send(stdout);
  });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
