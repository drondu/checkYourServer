#!/bin/bash




while :
do
	ifstat > net.log | sudo python3 networkStats.py
	sudo netstat -aup | grep -s "ESTABLISHED" -c > estbConn.txt
	sudo netstat -aup | grep -s "LISTEN" -c > lstnConn.txt
	sudo python3 networkNos.py
done