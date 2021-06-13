
#!/bin/bash


###########Aliases#################################
start_disk() { cd diskUsage && nohup ./diskUsage.sh </dev/null >/dev/null 2>&1 & }
start_network() { cd networkUsage && nohup ./network.sh </dev/null >/dev/null 2>&1 & }
start_nrproc()
{
	cd processesNumber && nohup ./procNr.sh </dev/null >/dev/null 2>&1 &
}

start_ramusage()
{
	cd ramUsage && nohup ./ramUsage.sh </dev/null >/dev/null 2>&1 &
}
start_fan()
{
	cd cpuFan && nohup ./cpufan.sh </dev/null >/dev/null 2>&1 &
}

start_powerusage()
{
	cd powerUsage && nohup ./powerusage.sh </dev/null >/dev/null 2>&1 &
}

start_cpu()
{
	cd cpuUsage && nohup ./sensors.sh </dev/null >/dev/null 2>&1 &
}

##########Functions##############################
prepare_env()
{
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
	start_network | start_disk | start_ramusage | start_fan | start_powerusage | start_nrproc | start_cpu
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

