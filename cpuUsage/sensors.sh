#!/bin/bash


while :
do

	sensors | grep Core* | tail -n 100 | awk '{print int($3)}' > cpuTemps.log
	sudo python3 cpuTemps.py

	sleep 2	
done