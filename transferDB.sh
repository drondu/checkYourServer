#!/bin/bash


while :
do
	sleep 5

	scp diskUsage/diskUsage.db drondu@10.124.191.1:~/Desktop/licenta/checkYourServer/DBs/diskUsageServer0.db
	scp networkUsage/netUsage.db drondu@10.124.191.1:~/Desktop/licenta/checkYourServer/DBs/netUsageServer0.db

done
