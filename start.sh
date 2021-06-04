#!/bin/bash

if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo:"
    echo "sudo $0 $*"
    exit 1
fi



###########Aliases#################################
start_disk()
{
	cd diskUsage && nohup ./diskUsage.sh </dev/null >/dev/null 2>&1 &
}

start_network()
{
	cd networkUsage && nohup ./network.sh </dev/null >/dev/null 2>&1 &
}

start_cpu()
{
	cd cpuUsage && nohup ./sensors.sh </dev/null >/dev/null 2>&1 &
}


create_db() 
{
	cd DBs && nohup ./createBigMamaDB.sh </dev/null >/dev/null 2>&1 &
}

start_server0() 
{ 
	nohup sshpass -proot ssh ubuntu@10.238.184.75 'cd licenta/checkYourServer/ && nohup ./start.sh &' 
}

start_server1() 
{ 
	sshpass -proot ssh ubuntu@10.238.184.245 'cd checkYourServer && nohup ./start.sh &' 
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
	ls | grep -v 'createBigMamaDB.sh' | xargs rm	
	cd ..
	cd pyHelpers
	rm -rf hostname.txt
	hostname > hostname.txt
	rm -rf username.txt
	get_username
	cd .. 
}

start_aggregated_machines()
{
	start_server0 | start_server1
}

start_local_machine()
{
	start_disk | start_network | start_cpu
	create_db
}

get_username()
{
	echo "Enter username from webtool: " && read line
	echo "$line" > username.txt
}

start_web_app()
{
	nohup npm run dev-start </dev/null >/dev/null 2>&1 &
}


#==================jobs=============================

echo "Starting scripts"

prepare_env
start_local_machine #| start_aggregated_machines #| start_web_app

echo "Scripts are started"