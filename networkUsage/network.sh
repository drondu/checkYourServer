#!/bin/bash



nohup ifstat > net.log &
nohup sudo python3 networkStats.py  &

while :
do
	sudo netstat -aup | grep -s "ESTABLISHED" -c > estbConn.txt
	sudo netstat -aup | grep -s "LISTEN" -c > lstnConn.txt
	sudo python3 networkNos.py
done