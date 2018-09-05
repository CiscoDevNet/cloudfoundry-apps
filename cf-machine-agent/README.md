# Deploying Machine Agent onto a CloudFoundry Platform

## Pre-Requisites

- cf access.
- Download [Machine Agent] (https://download.appdynamics.com/download/#version=&apm=machine&os=linux)


## Steps


- Download StandAlone Machine agent from [AppDynamics Download Portal](https://download.appdynamics.com/download/#version=&apm=machine&os=linux) into the current directory. 

```
(master)$ ls
MachineAgent-4.5.1.1385.zip	extensions			package.sh
README.md			manifest.yml

```

- Copy any extensions to extensions folder. Note that extensions must be of *.zip (containing extesnsion_folder/{*.jar, *.monitor.xml} etc) 

```
  (master)$ cp ~/Downloads/PCFExtension-1.0.0.zip extensions/
```


- Edit the `manifest.yml`'s env section `JAVA_OPTS` with controller information. For e.g: after filling the details the manifest.yml will look like 

```
---
applications:
- name: appdynamics-machine-agent
  memory: 1G
  health-check-type: process
  no-route: true
  buildpack: java_buildpack_offline
  path: MachineAgent.zip
  env:
    JAVA_OPTS: '-Dappdynamics.agent.accountAccessKey=accessKey -Dappdynamics.agent.accountName=customer1 -Dappdynamics.controller.hostName=saas-controller.e2e.appd.com -Dappdynamics.controller.port=8090 -Dappdynamics.agent.applicationName=app -Dappdynamics.agent.tierName=tier -Dappdynamics.agent.nodeName=node -Dappdynamics.controller.ssl.enabled=false'


```


- Run `package.sh` - this script packages extension zips into machine agent monitor folder and cleans machine agent and adjusts the permissions of files per requirements from cloudfoundry

```
(master)$ ./package.sh 
Creating workdir tmp
Moving MachineAgent to tmp dir
Unzipping MachineAgent
Unzipping Extensions from ../extensions to ./monitors Directory
Cleaning MachineAgent - removing *.asc files
Adjusting permissions as per requirement from CloudFoundry
Packaging MachineAgent

```


- Now push the machine application `cf push`

```
pavan.krishna@OSXLTPKrishna:~/appdy/cloudfoundry-apps/cf-machine-agent (master)$ cf push 
Pushing from manifest to org appdynamics-org / space appdynamics-space as admin...
Using manifest file /Users/pavan.krishna/appdy/cloudfoundry-apps/cf-machine-agent/manifest.yml
Getting app info...
Updating app with these attributes...
  name:                appdynamics-machine-agent
  path:                /Users/pavan.krishna/appdy/cloudfoundry-apps/cf-machine-agent/MachineAgent.zip
  buildpack:           java_buildpack_offline
  command:             JAVA_OPTS="-agentpath:$PWD/.java-buildpack/open_jdk_jre/bin/jvmkill-1.16.0_RELEASE=printHeapHistogram=1 -Djava.io.tmpdir=$TMPDIR -Djava.ext.dirs=$PWD/.java-buildpack/container_security_provider:$PWD/.java-buildpack/open_jdk_jre/lib/ext -Djava.security.properties=$PWD/.java-buildpack/java_security/java.security $JAVA_OPTS" && CALCULATED_MEMORY=$($PWD/.java-buildpack/open_jdk_jre/bin/java-buildpack-memory-calculator-3.13.0_RELEASE -totMemory=$MEMORY_LIMIT -loadedClasses=30244 -poolType=metaspace -stackThreads=250 -vmOptions="$JAVA_OPTS") && echo JVM Memory Configuration: $CALCULATED_MEMORY && JAVA_OPTS="$JAVA_OPTS $CALCULATED_MEMORY" && MALLOC_ARENA_MAX=2 JAVA_OPTS=$JAVA_OPTS JAVA_HOME=$PWD/.java-buildpack/open_jdk_jre exec $PWD/bin/machine-agent
  disk quota:          1G
  health check type:   process
  instances:           1
  memory:              1G
  stack:               cflinuxfs2
  env:
    JAVA_OPTS

Updating app appdynamics-machine-agent...

```

- Once pushed the machine agent starts in a container in the PCF Elastic Runtime as an appliation `appdynamics-machine-agent` 

```
(master)$ cf apps
Getting apps in org appdynamics-org / space appdynamics-space as admin...
OK
appdynamics-machine-agent   started           1/1         1G       1G
```




