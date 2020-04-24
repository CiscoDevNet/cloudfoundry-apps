/*
 This example assumes use of the Appdynamics marketplace service published by the
 AppDynamics Application Monitoring for PCF tile

 It reads the agent configuration informartion from the Appdynamics marketplace service
 and environment variables specified in manifest.yml
 Controller configuration is read through the service.
 Read through this documentation to setup the agent:
 https://docs.pivotal.io/partners/appdynamics/using.html#node_workflow
*/
var cfEnv = require('cfenv');
var appEnv = cfEnv.getAppEnv();
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function (req, res) {
  res.send('Hello, World!');
});

app.get('/env', function (req, res) {
  res.send(appEnv);
});

var port = Number(process.env.VCAP_APP_PORT || 5000);
app.listen(port, function () {
  console.log("Listening on " + port);
});
