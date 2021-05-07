#!/bin/bash

echo "started disk monitoring"

while :
do
	echo "hopa"
	df -h -v /tmp/ > diskUsage.txt
	grep -i "dev" diskUsage.txt > diskUsageStripped.txt
	sudo smartctl -A /dev/nvme0 > diskTemp.txt
	grep -i "temperature:" diskTemp.txt > diskTempStripped.txt
	python3 diskUsage.py
	sleep 1
done