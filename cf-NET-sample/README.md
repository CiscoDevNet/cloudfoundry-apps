# .NET Sample App
This application is a modified version of Cloud Foundry's .NET (full framework) sample application. It has been modified to simply make an exit call to google.com each time the page is loaded.

## To use
Follow the instructions for building and installing the [AppDynamics HWC buildpack](https://github.com/Appdynamics/hwc-buildpack). Then you can push this app from the ViewEnvironment directory:
```
cd ViewEnvironment
cf push my_app_name -b [BUILDPACK_NAME] -s windows2012R2
```
where [BUILDPACK_NAME] is what you named the AppDynamics HWC buildpack you installed to your CloudFoundry environment.
