#! /usr/bin/p9ython

import sys
sys.path.append('../pyHelpers')

from gethost import getUserName
from diskspace import getDiskSpace
import timeandid as tid
import subprocess


fin = open('diskUsageStripped.txt','r')
fin2 = open('diskTempStripped.txt', 'r')
fout = open('../DBs/diskUsageMother.db', 'a')

line = fin2.readline()
line = line.rstrip()

val = ''
for el in line:
	if el.isdigit():
		val += el

if int(val) >= 35:
	err = open('diskErrors.txt', 'a')
	err.write('Your disk temperature exceed with tmp: ' + val)
	err.flush()
	err.close()
	subprocess.call('./mail.sh',shell=True)

temp = getUserName()
temp += getDiskSpace(fin)
temp += '","temperature":"' + val 
temp += tid.getTimeStamp() + tid.getID() 
# print(temp)			
fout.write(temp)
fout.flush()

fin.close()
fout.close()
