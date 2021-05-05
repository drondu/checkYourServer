#!/bin/bash


while :
do
	 python3 networkStats.py | ifstat > net.log 

done