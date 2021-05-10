#!/bin/bash


while :
do
	sleep 5

	sshpass -p7022 scp diskUsage/diskUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/diskUsageServer0.db
	sshpass -p7022 scp networkUsage/netUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/netUsageServer0.db

	rm -rf diskUsage/diskUsage.db networkUsage/netUsage.db

done
