Java Cloudfoundry Application Instrumentation using Appdynamics
================================================================================

Pre-requisites
--------------

- A jar file 
- Install Appdynamics Application Performance Monitoring for PCF tile and add a controller configuration
- In our example here, we can compile the src by doing `./gradlew build` and it creates a jar file in `build/libs/cf-java-sample-1.0.jar`

Steps
------


  
- Edit manifest.yml to use

   1. **appdynamics service instance**: `appd` in this example
   1. **environment** AppDynamics app and tier names
   
   ```
   ---
  applications:
  - name: cf-java-appd
    memory: 1G
    random-route: true
    path: build/libs/cf-java-sample-1.0.jar
    buildpacks:
      - java_buildpack_offline
    env:
      APPDYNAMICS_AGENT_APPLICATION_NAME: my-java-app
      APPDYNAMICS_AGENT_TIER_NAME: cf-java-app
    services:
      - appd
   
   ```
- Push the application
```
$ cf push
```

   
