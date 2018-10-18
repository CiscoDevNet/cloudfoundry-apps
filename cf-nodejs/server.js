/*
 This example assumes use of the Appdynamics marketplace service published by the
 AppDynamics Application Monitoring for PCF tile

 Update appEnv.getServiceCreds('pcf-appd-instance') with the name of the service instance created using 
   $ cf create-service appdynamics <plan> <service-instance-name>
   
 Update this value in the manifest.yml as well then push the app
*/
var cfEnv = require('cfenv');
var appEnv = cfEnv.getAppEnv();
var appdService = appEnv.getServiceCreds('pcf-appd-instance');
var appdynamics = require("appdynamics").profile({
    controllerHostName: appdService['host-name'],
    controllerPort: appdService['port'],
    controllerSslEnabled: appdService['ssl-enabled'],
    accountName: appdService['account-name'],
    accountAccessKey: appdService['account-access-key'],
    nodeName: `${appEnv.name}.${process.env.CF_INSTANCE_INDEX}`,
    libagent: true
});
var fs = require('fs')
var child_process = require('child_process');
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello, World!');
});

app.get('/env', function(req, res) {
  res.send(appEnv);
});

var port = Number(process.env.PORT || 5000);
  app.listen(port, function() {
  console.log("Listening on " + port);
});
