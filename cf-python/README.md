Sample Python Cloudfoundry Application
================================================================================

Pre-Requisites.
================================================================================

- CloudFoundry Environment with Appdynamics Tile installed and configured with controller(s) information.
- Sample Application. 


To Use
================================================================================

- Make sure appdynamics service is available by doing `cf markerplace` command 

```
pavan.krishna@OSXLTPKrishna:~/appdy/docs-appdynamics (4.4.244)$ cf marketplace
Getting services from marketplace in org appdynamics-org / space dev as admin...
OK

service                       plans                          description
app-autoscaler                standard                       Scales bound applications in response to load
appdynamics                   443Controller, 450Controller   Appdynamics Monitoring Platform
```

- Create a service instance of appdynamics plan (controller configuration) that we want to expose to the application we are pushing. `cf create-service appdynamics <plan/controller_config> <name_of_the_application>`

```
pavan.krishna@OSXLTPKrishna:~/appdy/docs-appdynamics (4.4.244)$ cf create-service appdynamics 443Controller appd443
Creating service instance appd443 in org appdynamics-org / space dev as admin...
OK
```

Note that if we already have an instance for the plan of our choice, we donot have to create another one, we can reuse the same instance across multiple applications. 


- Edit manifest.yml to include the service instance we created so that the application binds to the instance. 
Just add

```
  services:
    - appd443
```

so `mainfest.yml` will look like

```
---
applications:
- name: cf-python-appdynamics
  memory: 500M
  buildpack: https://github.com/cloudfoundry/python-buildpack.git#develop
  services:
    - appd443
```


- Push the application using `cf push`

```
pavan.krishna@OSXLTPKrishna:~/appdy/cloudfoundry-apps/cf-python (master)$ cf push 
```

Once it is pushed, you can generate the traffic and you will notice the applicatio getting instrumented on Appdynamics Controller.  



license
================================================================================

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
