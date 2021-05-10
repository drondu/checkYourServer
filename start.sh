#!/bin/bash


###########Aliases#################################
start_disk()
{
	cd diskUsage && nohup ./diskUsage.sh </dev/null >/dev/null 2>&1 &
}

start_network()
{
	cd networkUsage && nohup ./network.sh </dev/null >/dev/null 2>&1 &
}


create_db() 
{
	cd DBs 
	nohup ./createBigMamaDB.sh </dev/null >/dev/null 2>&1 &
}

start_server0() 
{ 
	sshpass -proot ssh ubuntu@10.124.191.26 'cd licenta/checkYourServer/ && nohup ./start.sh &' 
}

start_server1() 
{ 
	sshpass -proot ssh ubuntu@10.124.191.22 'cd licenta/checkYourServer/ && nohup ./start.sh &' 
}


##########Functions##############################
prepare_env()
{
	cd diskUsage/
	rm -rf diskTempStripped.txt diskTemp.txt diskUsageStripped.txt diskUsage.txt
	cd ..
	cd networkUsage
	rm -rf net.log
	cd ..
	cd DBs
	rm -rf netUsage.db diskUsage.db
	rm -rf diskUsageServer0.db diskUsageServer1.db netUsageServer0.db netUsageServer1.db
	cd ..
	rm -rf hostname.txt 
	hostname > hostname.txt
}

start_aggregated_machines()
{
	start_server0 | start_server1
}

start_local_machine()
{
	start_disk | start_network
	#create_db
}


#==================jobs=============================

echo "Starting scripts"
	
prepare_env
start_local_machine #| start_aggregated_machines



echo "Scripts are started"