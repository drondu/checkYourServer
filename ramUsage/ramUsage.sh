#!/bin/bash

while :
do
	free -th > ramStats.txt
	sudo python3 ramUsage.py

	sleep 1
done
