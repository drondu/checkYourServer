#!/bin/bash

while :
do
	sleep 3

	cat diskUsage*.db >> ../database.db 
	cat netUsage*.db >> ../database.db
	cat cpuUsage*.db >> ../database.db 
	cat ramUsage*.db >> ../database.db
	cat procNr*.db >> ../database.db
	cat cpuFan*.db >> ../database.db
	cat watsUsage*.db >> ../database.db
	cat connectionsUsage*.db >> ../database.db

	rm -rf diskUsage* netUsage* cpuUsage* ramUsage* procNr* cpuFan* watsUsage* connectionsUsage*
done