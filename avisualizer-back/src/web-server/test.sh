#!/bin/bash

unzip $1 -d ./asniffer/
echo $3
java -jar ./asniffer/asniffer.jar -p $2 -r ./projects/ -t jsonAV
mkdir ./projects/$3
while [ ! -f ./projects/asniffer_results/*.json ]; do sleep 1 echo 'sniffer notdone'; done
echo 'sniffer done'
mv ./projects/asniffer_results/*.json ./projects/$3
rm -r ./projects/asniffer_results/
rm  $1
rm -r $2
