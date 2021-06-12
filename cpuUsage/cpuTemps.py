#! /usr/bin/p9ython
import os, sys
sys.path.append('../pyHelpers')

from gethost import getUserName
import timeandid as tid

fin = open('cpuTemps.log', 'r')
fout = open('cpuUsage.db', 'a')


line = fin.readline()
temps = []
while line:
	temps.append(line.rstrip())
	line = fin.readline()

avg = 0	
temp = getUserName()	

for x in range(len(temps)):
	avg += int(temps[x])
	temp += '","core' + str(x) + '":"' + temps[x] + '",'

temp += '"core_avg":"' + str(avg/len(temps))
temp += tid.getTimeStamp() + tid.getID() 


# print(temp)
fout.write(temp)
fout.flush()
fout.close()
fin.close()