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

start_nrproc()
{
	cd processesNumber && nohup ./procNr.sh </dev/null >/dev/null 2>&1 &
}

start_ramusage()
{
	cd ramUsage && nohup ./ramUsage.sh </dev/null >/dev/null 2>&1 &
}

create_db() 
{
	cd DBs && nohup ./createBigMamaDB.sh </dev/null >/dev/null 2>&1 &
}

start_fan()
{
	cd cpuFan && nohup ./cpufan.sh </dev/null >/dev/null 2>&1 &
}

start_powerusage()
{
	cd powerUsage && nohup ./powerusage.sh </dev/null >/dev/null 2>&1 &
}



start_servers()
{
	echo "Starting servers"
	#ssh uname@ip 'sudo nohup /*path_to_app_folder*/start.sh &'
	#scp  pyHelpers/username.txt uname@ip:~/path_to_app_folder/pyHelpers/
	echo "Servers started"
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


start_local_machine()
{
	start_disk | start_network | start_cpu | start_ramusage | start_fan | start_powerusage
	start_nrproc
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
ssh ubuntu@10.238.184.75 'cd licenta/checkYourServer/ && sudo nohup ./start.sh &'
start_local_machine 

#| start_web_app

echo "Scripts are started"
