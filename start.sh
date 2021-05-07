#!/bin/bash


echo "Starting scripts"


hostname > hostname.txt
cd diskUsage && nohup ./diskUsage.sh </dev/null >/dev/null 2>&1 &
cd networkUsage && nohup ./network.sh </dev/null >/dev/null 2>&1 &

echo "Scripts are started"
