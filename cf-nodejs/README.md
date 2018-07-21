Sample Nodejs Cloudfoundry Application Instrumentation.
================================================================================

Pre-Requisites.
================================================================================

- CloudFoundry Environment with Appdynamics Tile installed and configured with controller(s) information.
- Sample Application. 


To Use
================================================================================

- Make sure appdynamics service is available by doing `cf marketplace` command 

```
pavan.krishna@OSXLTPKrishna:~/pcf-dash-generator$ cf marketplace
Getting services from marketplace in org appdynamics-org / space dev as admin...
OK

service                       plans                                           description
app-autoscaler                standard                                     Scales bound applications in response to load
appdynamics                   45Controller, 443Controller                 Appdynamics Monitoring Platform
```

- Create a service instance of appdynamics plan (controller configuration) that we want to expose to the application we are pushing. `cf create-service appdynamics <plan/controller_config> <name_of_the_application>`

```
pavan.krishna@OSXLTPKrishna:~/pcf-dash-generator$ cf create-service appdynamics 45Controller appd45
Creating service instance appd443 in org appdynamics-org / space dev as admin...
OK
```

Note that if we already have an instance for the plan of our choice, we donot have to create another one, we can reuse the same instance across multiple applications. 

```
pavan.krishna@OSXLTPKrishna:~/appdy/cloudfoundry-apps/cf-nodejs (master)$ cf services
Getting services in org appdynamics-org / space appdynamics-space as admin...

name           service       plan           bound apps                     last operation
appd45         appdynamics   45Controller   appd-node-demo, node-cf-appd   create succeeded
```


- Edit manifest.yml to include the service instance we created so that the application binds to the instance. 
Just add

```
  services:
    - appd45
```

so `manifest.yml` will look like

```
---
applications:
- name: cf-nodejs-appdynamics
  memory: 500M
  buildpack: https://github.com/cloudfoundry/nodejs-buildpack.git # optional as appdynamics support is merged in the standard bps.
  services:
    - appd45
```


- Edit your application and  paste the following in your application as the very first line of your application source code, before any other require statement:


```
require('appdynamics').profile({});
```

- Add appdynamics package in the list of dependencies specified in your package.json

```
  ....
  "dependencies": {
    "express": "~4.15.2",
    "logfmt": "~1.2.0",
    "appdynamics": "latest"
  },
  ...
```

- Push the application using `cf push`

```
pavan.krishna@OSXLTPKrishna:~/pcf-dash-generator$ cf push 
```

Once it is pushed, you can generate the traffic and you will notice the application getting instrumented on Appdynamics Controller.  
