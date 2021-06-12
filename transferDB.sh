#!/bin/bash

value=$(<hostname.txt)
conn=$(<isconnavail.txt)

avail=1


while :
do
	sleep 1d
	if [ $avail == $conn ]
	then
		sshpass -p7022 scp diskUsage/diskUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/diskUsage$value.db
		sshpass -p7022 scp networkUsage/netUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/netUsage$value.db
		sshpass -p7022 scp cpuFan/cpuFan.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/cpuFan$value.db
		sshpass -p7022 scp cpuUsage/cpuUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/cpuUsage$value.db
		sshpass -p7022 scp networkUsage/connectionsUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/connectionsUsage$value.db
		sshpass -p7022 scp processesNumber/procNr.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/procNr$value.db
		sshpass -p7022 scp powerUsage/watsUsage.db daniel@10.238.184.1:~/Desktop/checkYourServer/DBs/watsUsage$value.db

		rm -rf diskUsage/diskUsage.db networkUsage/netUsage.db powerUsage/watsUsage.db processesNumber/procNr.db cpuUsage/cpuUsage.db
		rm -rf cpuFan/cpuFan.db
	fi

done
