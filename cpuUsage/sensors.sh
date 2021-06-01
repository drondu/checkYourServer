#!/bin/bash


while :
do
	# echo 'again cpu'
	sensors | grep Core* | tail -n 10 | awk '{print int($3)}' > cpuTemps.log
	sudo python3 cpuTemps.py

	sleep 2	
done