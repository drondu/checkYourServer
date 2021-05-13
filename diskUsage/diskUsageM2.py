#! /usr/bin/p9ython
import sys
sys.path.append('../pyHelpers')

from gethost import getHostName
import timeandid as tid
import time

fin = open('diskUsageStripped.txt','r')
fin2 = open('diskTempStripped.txt', 'r')
fout = open('../DBs/diskUsageMother.db', 'a')

line = fin2.readline()
line = line.rstrip()

val = ''
for el in line:
	if el.isdigit():
		val += el

# time.sleep(0.5)

count = 0
line = fin.readline()
for el in line.split():
	time.sleep(0.1)
	if count == 0:
		name = el
	if count == 2:
		el.rstrip()
		temp = ''
		for nb in el:
			if nb.isdigit():
				temp += nb		
		used = temp
	if count == 3:
		el.rstrip()
		temp = ''
		for nb in el:
			if nb.isdigit():
				temp += nb
		available = temp
		
	count+=1

temp = '{"host":"' + getHostName()
temp += '","name":"' + name 
temp += '","used":"' + used 
temp += '","available":"' + available
temp += '","temperature":"' + val 
temp += tid.getTimeStamp() + tid.getID() 
# print('temp: ' + temp)			
fout.write(temp)
fout.flush()

fin.close()
fout.close()
