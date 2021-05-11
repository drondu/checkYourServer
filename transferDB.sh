#!/bin/bash

value=$(<hostname.txt)


while :
do
	sleep 3

	sshpass -p7022 scp diskUsage/diskUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/diskUsage$value.db
	sshpass -p7022 scp networkUsage/netUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/netUsage$value.db

	rm -rf diskUsage/diskUsage.db networkUsage/netUsage.db

done
