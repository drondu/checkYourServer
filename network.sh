#!/bin/bash


while :
do
	echo "Network monitoring started" 
	ifstat > net.log | python3 networkStats.py  

done