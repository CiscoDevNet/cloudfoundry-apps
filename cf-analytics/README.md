# Deploying Analytics Agent to Cloudfoundry as Java Application

We can deploy analytics agent as a Java artifact to cloudfoundry after changing few files in the original Analytics Agent binary available from appdynamics downloads site. The procedure is scripted  

- Download Analytics Agent zip from [download portal](https://download.appdynamics.com/download/#version=&apm=analytics&os=&platform_admin_os=&appdynamics_cluster_os=&events=&eum=&page=1)

- Run `./build.sh`. This will create an artifact cf-anlaytics.zip that can be pushed to cloud foundry

- Edit manifest.yml's `env` section to provide AppDynamics Controller/ Event Service URLs/ Account Name/Access Key

- `cf push` 

- This will host appdynamics agent on cloudfoundry 

- After that please follow steps https://docs.pivotal.io/partners/appdynamics-analytics/installing.html#step2 to bind applications to appdynamics service