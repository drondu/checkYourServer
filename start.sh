
#!/bin/bash


###########Aliases#################################
start_disk() { cd diskUsage && nohup ./diskUsage.sh </dev/null >/dev/null 2>&1 & }
start_network() { cd networkUsage && nohup ./network.sh </dev/null >/dev/null 2>&1 & }

stop_pros()
{
	./destroy.sh
}


##########Functions##############################
prepare_env()
{
	stop_pros
	cd diskUsage/
	rm -rf diskUsage.db diskTempStripped.txt diskTemp.txt diskUsageStripped.txt diskUsage.txt
	cd ..
	cd networkUsage/
	rm -rf net.log  netUsage.db
	cd ..
	rm -rf hostname.txt
	hostname > hostname.txt
}

start_local_machine()
{
	start_network | start_disk
}

transfer_dbs()
{
	nohup ./transferDB.sh </dev/null >/dev/null 2>&1 &
}


#==================jobs=============================

echo "Starting scripts"

prepare_env
start_local_machine | transfer_dbs

echo "Scripts are started"

