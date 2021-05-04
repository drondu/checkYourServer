#!/bin/bash


while :
do
	sudo smartctl -A /dev/nvme0 > test.log
	grep -i "temperature:" test.log > ion.txt
	python3 hardTemp.py
	sleep 1
done