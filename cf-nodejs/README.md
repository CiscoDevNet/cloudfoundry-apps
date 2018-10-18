Sample Nodejs Cloud Foundry Application Instrumentation.
================================================================================

Pre-Requisites.
================================================================================

- Cloud Foundry Environment with AppDynamics Application Monitoring for PCF  Tile installed and configured with controller(s) information.
- Sample Application. 


To Use
================================================================================

- Make sure appdynamics service is available by doing `cf marketplace` command 

```
$ cf marketplace
Getting services from marketplace in org appdynamics-org / space dev as admin...
OK

service                       plans                                           description
appdynamics                   45Controller, 443Controller                 Appdynamics Monitoring Platform
```

- Create a service instance of appdynamics plan (controller configuration) that we want to expose to the application we are pushing. `cf create-service appdynamics <plan/controller config> <appd-service-instance-name>`

```
$ cf create-service appdynamics 45Controller pcf-appd-instance
Creating service instance pcf-appd-instance in org appdynamics-org / space dev as admin...
OK
```

Note that if we already have an instance for the plan of our choice, we do not have to create another one, we can reuse the same instance across multiple applications. 

```
$ cf services
Getting services in org appdynamics-org / space appdynamics-space as admin...

name                 service       plan           bound apps                     last operation
pcf-appd-instance    appdynamics   45Controller   appd-node-demo, node-cf-appd   create succeeded
```


- Edit manifest.yml to include the service instance we created so that the application binds to the instance. 
Just add

```
  services:
    - pcf-appd-instance
```

- Edit your application and  paste the following in your application at the beginning of your application source code, before any other require statement:


```
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
```

- Add appdynamics package in the list of dependencies specified in your package.json

```
  ....
  "dependencies": {
    "express": "~4.15.2",
    "logfmt": "~1.2.0",
    "appdynamics": "latest",
    "cfenv": "latest"
  },
  ...
```

- Push the application using `cf push`

```
$ cf push 
```

Once it is pushed, you can generate the traffic and you will notice the application getting instrumented on Appdynamics Controller.  
