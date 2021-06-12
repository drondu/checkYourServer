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
			sudo smartctl -A /dev/nvme0 > diskTemp.txt
			grep -i "temperature:" diskTemp.txt > diskTempStripped.txt
			sudo python3 diskUsageM2.py
	elif [ $value == $hdd ]
		then
			sudo hddtemp /dev/sd[abcdefgh] > hddTemp.txt
			grep -i "" hddTemp.txt > hddTempStripped.txt
			sudo python3 diskUsageHDD.py
	else
		sudo smartctl -A /dev/nvme0 > diskTemp.txt
		grep -i "temperature:" diskTemp.txt > diskTempStripped.txt
		sudo python3 diskUsageM2.py
	fi
	sleep 1
done
