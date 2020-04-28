Sample Node.js Cloud Foundry Application Instrumentation.
================================================================================

Pre-Requisites
================================================================================

- CloudFoundry Environment with Appdynamics Tile installed and configured with controller(s) information and latest AppDynamics buildpack.
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
```
  services:
    - pcf-appd-instance
```
- Edit manifest.yml to include the AppDynamics buildpack before the Node.js buildpack

```
  buildpacks:
    - appdbuildpack
    - nodejs_buildpack
```

- Edit manifest.yml to set the AppDynamics environment variables for the Node.js agent

```
    APPD_AGENT: nodejs
    APPDYNAMICS_AGENT_APPLICATION_NAME: my-nodejs-app
    APPDYNAMICS_AGENT_TIER_NAME: cf-nodejs
```

- Push the application using `cf push`

```
$ cf push 
```

Once it is pushed, you can generate the traffic and you will notice the application getting instrumented on Appdynamics Controller.  
