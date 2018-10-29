# .NET Sample App
This application is a modified version of Cloud Foundry's .NET (full framework) sample application. It has been modified to simply make an exit call to google.com each time the page is loaded.

## Pre Requisites

- cf CLI v6.38 or higher for using multi buildpack approach
- hwc_buildpack v3.0 or higher

## To use

- Install AppDynamics APM tile for PCF v4.5.514 or higher - This will install  `appdbuildpack` AppDynamics Extension Buildpack. 
- Create service instance of appdynamics service (say, appd_ssl) exposed by the tile 

- cd ViewEnvironment
- Edit the `manifest.yml` to bind to the above service instance and to use buildpacks `appdbuildpack` and `hwc_buildpack` 


```
$ cat manifest.yml

---
applications:
- name: cf-net-application-sample
  memory: 2G
  buildpacks: 
    - appdbuildpack
    - hwc_buildpack
  stack: windows2016
  env:
    BP_DEBUG: true
  services:
    - appd_ssl


```
- Push the application 

```
cf push 
```

or if you prefer to use buildpacks explicitly 

```
cf push <appname> -b appdbuildpack -b hwc_buildpack 
```

