#!/bin/bash


echo "starting networkStats"

while :
do
	hostname > hostname.txt
	echo "Network monitoring started" 
	ifstat > net.log | python3 networkStats.py  

done