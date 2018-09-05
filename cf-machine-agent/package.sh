#!/usr/bin/env bash

echo "Creating workdir tmp"
mkdir tmp

echo "Moving MachineAgent to tmp dir"
cp MachineAgent*.zip tmp
cd tmp

echo "Unzipping MachineAgent"
unzip -q MachineAgent*.zip
rm -f MachineAgent*.zip

echo "Unzipping Extensions from ../extensions to ./monitors Directory"
unzip -q ../extensions/*.zip -d monitors/

echo "Cleaning MachineAgent - removing *.asc files"
find bin ! -name 'machine-agent' -type f -exec rm -f {} +
find . -name "*.asc" -type f -delete

echo "Adjusting permissions as per requirement from CloudFoundry"
find . -type f -perm 444 -print -exec chmod 644 {} \;

echo "Packaging MachineAgent"
zip -q -r MachineAgent.zip  .
mv MachineAgent.zip ..

cd ..
rm -rf tmp