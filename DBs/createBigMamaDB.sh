#!/bin/bash

while :
do
	sleep 3

	cat diskUsage*.db >> database.db 
	cat netUsage*.db >> database.db

	rm -rf diskUsage* netUsage* 
done