#!/bin/bash


echo "Starting scripts"

killall diskUsage.sh python3 ifstat network.sh
sudo ls
cd diskUsage/
rm -rf diskTempStripped.txt diskTemp.txt diskUsage.db diskUsageStripped.txt diskUsage.txt
cd ..
cd networkUsage
rm -rf netUsage.db net.log
cd ..
rm -rf hostname.txt 
sudo hostname > hostname.txt
cd diskUsage && nohup ./diskUsage.sh </dev/null >/dev/null 2>&1 &
cd networkUsage && nohup ./network.sh </dev/null >/dev/null 2>&1 &

echo "Scripts are started"
