Java Cloudfoundry Application Instrumentation using Appdynamics
================================================================================

- Step 1: Compile the source code to create the jar file 
```
cloudfoundry-apps/cf-java-sample (master)$ ./gradlew build
```

- Step 2: (optional) Add any advanced configuration . To do this 
  1. create a folder `appdynamics/conf/` 
  
  1. Drop the additional configuration files like `transactions.xml` or `logging\log4j.xml` in `appdynamics\conf`
  
  1. add the folder to jar file  `jar -uf <jar-file> <folder>`
  ```
  $jar -uf build/libs/cf-java-sample-1.0.jar appdynamics
  ```
  1. verify that the folder is present 
  
  ```
  $jar -tf build/libs/cf-java-sample-1.0.jar | grep appdynamics
  appdynamics/
  appdynamics/conf/
  appdynamics/conf/transactions.xml
  appdynamics/conf/app-agent-config.xml
  appdynamics/conf/custom-interceptors.xml
  ```
- Step 3: Edit manifest.yml to use
   1. **buildpacks**:  `appdbuildpack` and `java_buildpack` 
   1. **appdynamics service instance**: `appd` in this example
   1. **Environment Varibale** `APPD_AGENT: java`
   
   ```
   ---
  applications:
  - name: spring-music
    memory: 1G
    random-route: true
    path: build/libs/cf-java-sample-1.0.jar
    buildpacks:
      - appdbuildpack
      - https://github.com/Appdynamics/java-buildpack.git
    env:
      APPD_AGENT: java
    services:
      - appd
   
   ```
- Step 4: Push the application
```
$ cf push
```

   
