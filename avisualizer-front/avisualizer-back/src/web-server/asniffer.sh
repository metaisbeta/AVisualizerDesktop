#!/bin/bash
echo $1
echo $2
mkdir $4/projects/$2
unzip $1 -d $4/asniffer
java -jar $4/asniffer/asniffer.jar -p $4/asniffer/$2 -r $4/projects/ -t jsonAV

while [ ! -d $4"/projects/asniffer_results" ]; do 
	echo 'stuck';
	sleep 3; 
done;

mv $4/projects/asniffer_results/*.json $4/projects/$2
rm -r $4/projects/asniffer_results/
rm -r $4/asniffer/$2
rm $4/asniffer/$3
