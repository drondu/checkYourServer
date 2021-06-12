#!/bin/bash

while :
do
	top -i -n 1 | grep -w "Tasks:" > procNr.txt
	sudo python3 procNr.py
	sleep 1
done
