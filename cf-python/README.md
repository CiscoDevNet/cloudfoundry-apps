Sample Python Cloudfoundry Application
================================================================================

Pre-Requisites.
================================================================================

- CloudFoundry Environment with Appdynamics Tile installed and configured with controller(s) information and latest AppDynamics buildpack
- Sample Application. 


To Use
================================================================================

- Make sure appdynamics service is available by doing `cf marketplace` command 

```
$ cf marketplace
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

Note that if we already have an instance for the plan of our choice, we do not have to create another one, we can reuse the same instance across multiple applications. 

```
$ cf services
Getting services in org appdynamics-org / space dev as admin...

name      service       plan            bound apps              last operation
appd443   appdynamics   443Controller                          create succeeded
```
- Edit manifest.yml to include the service instance we created so that the application binds to the instance. 

```
  services:
    - appd443
```

- Specify the AppDynamics buildpack before the python buildpack
```
  buildpacks: 
    - appdbuildpack
    - python_buildpack
```
- Add the environments variables to set the agent type, app name and tier name

```
  env:
    APPD_AGENT: python
    APPD_APP_NAME: my-python-app
    APPD_TIER_NAME: cf-python
```

The `manifest.yml` will look like this:

```
---
applications:
- name: cf-python-appd
  memory: 500M
  buildpacks: 
    - appdbuildpack
    - python_buildpack
  env:
    APPD_AGENT: python
    APPD_APP_NAME: my-python-app
    APPD_TIER_NAME: cf-python
  services:
    - appd443
```


- Push the application using `cf push`

```
$ cf push 
```

Once it is pushed, you can generate the traffic and you will notice the application getting instrumented on Appdynamics Controller.  
