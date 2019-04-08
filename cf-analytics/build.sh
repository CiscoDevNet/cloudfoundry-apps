#!/usr/bin/env bash
set -e

rm -rf tmp
mkdir tmp
cp analytics-agent*.zip tmp
cd tmp

unzip analytics-agent*.zip
mv analytics-agent/bin analytics-agent/scripts
cp -r ../bin analytics-agent/
cp -r ../analytics-agent.properties analytics-agent/conf/analytics-agent.properties
cp -r ../analytics-agent.vmoptions analytics-agent/conf/analytics-agent.vmoptions
cp -r ../monitor.xml analytics-agent/monitor.xml
zip -r ../cf-analytics.zip analytics-agent
