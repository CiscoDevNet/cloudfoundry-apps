#!/usr/bin/env bash

rm -rf tmp
mkdir tmp
cp analytics-agent*.zip tmp
cd tmp

echo "Unzipping ..."
unzip -q analytics-agent*.zip

echo "Renaming bin to scripts"
mv analytics-agent/bin analytics-agent/scripts

echo "Copying new bin"
cp -r ../bin analytics-agent/

echo "Modifying Properties file"
sed -i'' -e 's/ad.dw.http.port=9090/ad.dw.log.path=\${APPLICATION_HOME}\/logs/g' analytics-agent/conf/analytics-agent.properties
sed -i'' -e 's/ad.controller.url=http:\/\/localhost:8090/ad.controller.url=\${APPD_ANALYTICS_CONTROLLER}/g' analytics-agent/conf/analytics-agent.properties
sed -i'' -e 's/http.event.endpoint=http:\/\/localhost:9080/http.event.endpoint=\${APPD_ANALYTICS_EVENT_ENDPOINT}/g' analytics-agent/conf/analytics-agent.properties
sed -i'' -e 's/http.event.name=customer1/http.event.name=\${APPD_ANALYTICS_EVENT_NAME}/g' analytics-agent/conf/analytics-agent.properties
sed -i'' -e 's/http.event.accountName=analytics-customer1/http.event.accountName=\${APPD_ANALYTICS_GLOBAL_ACCOUNT}/g' analytics-agent/conf/analytics-agent.properties
sed -i'' -e 's/http.event.accessKey=your-account-access-key/http.event.accessKey=\${APPD_ANALYTICS_ACCESS_KEY}/g' analytics-agent/conf/analytics-agent.properties

echo "Modifying vmoptions file"
cp -r ../analytics-agent.vmoptions analytics-agent/conf/analytics-agent.vmoptions

echo "Adding monitor file"
cp -r ../monitor.xml analytics-agent/monitor.xml

echo "Bundling"
zip -q -r ../cf-analytics.zip analytics-agent
