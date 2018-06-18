Java Cloudfoundry Application Instrumentation using Appdynamics
================================================================================

Pre-Requisites.
================================================================================

- CloudFoundry Environment with Appdynamics Tile installed and configured with controller(s) information.
- Sample Java Application. 


To Use
================================================================================

- Make sure appdynamics service is available by doing `cf marketplace` command 

```
pavan.krishna@OSXLTPKrishna:~/pcf-dash-generator$ cf marketplace
Getting services from marketplace in org appdynamics-org / space dev as admin...
OK

service                       plans                          description
app-autoscaler                standard                       Scales bound applications in response to load
appdynamics                   443Controller, 450Controller   Appdynamics Monitoring Platform
```

- Create a service instance of appdynamics plan (controller configuration) that we want to expose to the application we are pushing. `cf create-service appdynamics <plan/controller_config> <name_of_the_application>`

```
pavan.krishna@OSXLTPKrishna:~/pcf-dash-generator$ cf create-service appdynamics 443Controller appd443
Creating service instance appd443 in org appdynamics-org / space dev as admin...
OK
```

Note that if we already have an instance for the plan of our choice, we donot have to create another one, we can reuse the same instance across multiple applications. 

```
pavan.krishna@OSXLTPKrishna:~/pcf-dash-generator$ cf services
Getting services in org appdynamics-org / space dev as admin...

name      service       plan            bound apps              last operation
appd443   appdynamics   443Controller                          create succeeded
```



- Edit manifest.yml to include the service instance we created so that the application binds to the instance. 
Just add

```
  services:
    - appd443
```

so `manifest.yml` will look like

```
---
applications:
- name: spring-music
  memory: 1G
  random-route: true
  path: build/libs/spring-music-1-1.0.jar
  services:
    - appd443
```

- Push the application using `cf push`

```
pavan.krishna@OSXLTPKrishna:~/pcf-dash-generator$ cf push 
```

Once it is pushed, you can generate the traffic and you will notice the application getting instrumented on Appdynamics Controller.  
