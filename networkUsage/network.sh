#!/bin/bash

while :
do
	ifstat > net.log | sudo python3 networkStats.py
done