#!/bin/bash


while :
do
	sleep 5

	sshpass -p7022 scp diskUsage/diskUsage.db drondu@10.124.191.1:~/Desktop/licenta/checkYourServer/DBs/diskUsageServer0.db
	sshpass -p7022 scp networkUsage/netUsage.db drondu@10.124.191.1:~/Desktop/licenta/checkYourServer/DBs/netUsageServer0.db

	rm -rf diskUsage/diskUsage.db networkUsage/netUsage.db
done
