#!/bin/bash

while :
do
	top -b -n 1  | grep -w "Tasks:" > procNr.txt && sleep 1 && sudo python3 procNr.py
	sleep 1
done
