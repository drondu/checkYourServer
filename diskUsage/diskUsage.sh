#!/bin/bash

value=$(cat /sys/block/sda/queue/rotational)

ssd=0
hdd=1

while :
do
	df -h -v /tmp/ > diskUsage.txt
	grep -i "dev" diskUsage.txt > diskUsageStripped.txt
	
	if [ $value == $ssd ]
		then
			echo "hopa, ai ssd"
	elif [ $value == $hdd ]
		then
			echo "hopa, ai hdd"
	else
		echo "hopa, ai m2"
		sudo smartctl -A /dev/nvme0 > diskTemp.txt
		grep -i "temperature:" diskTemp.txt > diskTempStripped.txt
		python3 diskUsageM2.py
	fi
	sleep 1
done