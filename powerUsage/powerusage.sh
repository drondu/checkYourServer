#!/bin/bash

while :
do
	awk '{print $1*10^-6}' /sys/class/power_supply/BAT0/power_now > drawnWats.txt
	sudo python3 powerusage.py
	sleep 1
done
