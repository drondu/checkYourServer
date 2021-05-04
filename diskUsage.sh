#!/bin/bash


while :
do
	df -h -v /tmp/ > diskUsage.txt
	grep -i "dev" diskUsage.txt > diskUsageStripped.txt
	sudo smartctl -A /dev/nvme0 > diskTemp.txt
	grep -i "temperature:" diskTemp.txt > diskTempStripped.txt
	python3 diskUsage.py
	# sudo smartctl -A /dev/nvme0 > test.log
	# grep -i "temperature:" test.log > ion.txt
	# python3 hardTemp.py
	sleep 1
done