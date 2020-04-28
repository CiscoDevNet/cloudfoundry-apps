# Deploying Machine Agent and extension as a container in PCF

## Steps


- Download StandAlone Machine agent from [AppDynamics Download Portal](https://download.appdynamics.com/download/#version=&apm=machine&os=linux) into the current directory. 

```
$ ls
MachineAgent-4.5.1.1385.zip	extensions			package.sh
README.md			manifest.yml

```
- Download the extension from the [AppDynamics Exchange](https://www.appdynamics.com/community/exchange/) into the current directory. 

- Copy the extensions to extensions folder. Note that extensions must be a *.zip (containing extesnsion_folder/{*.jar, *.monitor.xml} etc). For example:

```
$ cp ~/Downloads/rabbitmqmonitor-2.0.2.zip extensions/
```

- Edit the `manifest.yml`'s env section `JAVA_OPTS` with controller information. For example, after filling the details the manifest.yml will look like this: 
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
    JAVA_OPTS: '-Dappdynamics.agent.accountAccessKey=accessKey -Dappdynamics.agent.accountName=customer1 -Dappdynamics.controller.hostName=saas-controller.e2e.appd.com -Dappdynamics.controller.port=8090 -Dappdynamics.agent.applicationName=app -Dappdynamics.agent.uniqueHostId=myUniqueHostId -Dappdynamics.controller.ssl.enabled=false'
```

- Run `package.sh` - this script packages extension zips into machine agent monitor folder and cleans machine agent and adjusts the permissions of files per requirements from cloudfoundry

```
$ ./package.sh 
Creating workdir tmp
Moving MachineAgent to tmp dir
Unzipping MachineAgent
Unzipping Extensions from ../extensions to ./monitors Directory
Cleaning MachineAgent - removing *.asc files
Adjusting permissions as per requirement from CloudFoundry
Packaging MachineAgent

```

- Now push the machine agent using `cf push`

```
$ cf push 
```
Verify the app is running and check the app logs on the container (home/vcap/app) to validate the extension is working. Note the conf/logging/log4j.xml file in MachineAgent.zip can be configured to log to the console.
```
$ cf apps
Getting apps in org appdynamics-org / space appdynamics-space as admin...
OK
appdynamics-machine-agent   started           1/1         1G       1G
```

