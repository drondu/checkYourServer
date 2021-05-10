#!/bin/bash

while :
do
	sleep 5

	cat diskUsageServer0.db >> diskUsage.db 
	cat netUsageServer0.db >> netUsage.db
	cat diskUsageServer1.db >> diskUsage.db 
	cat netUsageServer1.db >> netUsage.db

done