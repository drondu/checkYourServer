#!/bin/bash


killall start.sh
killall diskUsage.sh
killall ifstat
killall python3
killall network.sh
killall transferDB.sh
killall createBigMamaDB.sh
killall sensors.sh

sshpass -proot ssh ubuntu@10.238.184.245 'cd checkYourServer && ./destroy.sh' 
sshpass -proot ssh ubuntu@10.238.184.75 'cd licenta/checkYourServer && ./destroy.sh' 