#!/bin/bash


# while :
# do 
	ifstat > net.log | python3 networkStats.py  
# done