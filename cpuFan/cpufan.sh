#!/bin/bash


while :
do

	sensors | grep fan | grep -Eo '[0-9]+' >> cpuFan.txt
	sudo python3 cpufan.py

	sleep 2	
done