#!/bin/bash

check_cons()
{
	sudo netstat -aup | grep -s "ESTABLISHED" -c > estbConn.txt
	sudo netstat -aup | grep -s "LISTEN" -c > lstnConn.txt
	sudo python3 networkNos.py
}

nohup ifstat > net.log  &
nohup sudo python3 networkStats.py  &

while :
do
	check_cons

done
