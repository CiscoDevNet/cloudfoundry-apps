/*
 This example assumes use of the Appdynamics marketplace service published by the
 AppDynamics Application Monitoring for PCF tile

 Update appEnv.getServiceCreds('pcf-appd-instance') with the name of the service instance created using 
   $ cf create-service appdynamics <plan> <service-instance-name>
   
 Update this value in the manifest.yml as well then push the app
 
 This example also assumes that you set environment variables APPD_APP_NAME and
 APPD_TIER_NAME, for example
   $ cf set-env appd-node-demo APPD_APP_NAME mynodeapp
   $ cf set-env appd-node-demo APPD_TIER_NAME mynodetier
   
 Using this pattern, you can use the same require("appdynamics").profile code below in all of
 your nodejs apps.
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
    applicationName: `${process.env.APPD_APP_NAME}`,
    tierName: `${process.env.APPD_TIER_NAME}`,
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
