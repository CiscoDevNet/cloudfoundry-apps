# .NET Sample App
This application is a modified version of Cloud Foundry's .NET (full framework) sample application. It has been modified to simply make an exit call to google.com each time the page is loaded.

## Pre Requisites

- cf CLI v6.38 or higher for using multi buildpack approach
- hwc_buildpack v3.0 or higher

## To use

- Install the latest AppDynamics APM tile for PCF, which will install the  `appdbuildpack` AppDynamics Extension Buildpack. Add a controller configuration before deploying the tile.
- Create a service instance for the AppDynamics marketplace service
- cd ViewEnvironment
- Edit the `manifest.yml` to bind to the above service instance
```
  services:
    - pcf-appd-instance
```
- Add the AppDynamics buildpack before the HWC buildpack
```
 buildpacks: 
    - appdbuildpack
    - hwc_buildpack
```
- Set the AppDynamics environment variables for the .NET agent. Replace APPD_AGENT_HTTP_URL with an internal repo where the downloaded agent is hosted.
```
  env:
    APPD_AGENT: dotnet 
    APPDYNAMICS_AGENT_APPLICATION_NAME: my-cf-net-app
    APPDYNAMICS_AGENT_TIER_NAME: cf-net-app
    
    APPD_AGENT_HTTP_URL: https://www.nuget.org/api/v2/package/AppDynamics.Agent.Distrib.Micro.Windows/20.4.0
```
The manifest should look like this:
```
---
applications:
- name: cf-net-appd
  memory: 2G
  buildpacks: 
    - appdbuildpack
    - hwc_buildpack
  stack: windows2016
  env:
    APPD_AGENT: dotnet 
    APPDYNAMICS_AGENT_APPLICATION_NAME: my-cf-net-app
    APPDYNAMICS_AGENT_TIER_NAME: cf-net-app
    # replace with internal repo where downloaded agent is hosted
    APPD_AGENT_HTTP_URL: https://www.nuget.org/api/v2/package/AppDynamics.Agent.Distrib.Micro.Windows/20.4.0
  services:
    - pcf-appd-instance
```
- Push the application and validate it's reporting to the AppDynamics controller

```
cf push 
```