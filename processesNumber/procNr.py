#! /usr/bin/p9ython 

import sys
sys.path.append('../pyHelpers')

from gethost import getUserName
from diskspace import getDiskSpace
import timeandid as tid

fin = open('procNr.txt', 'r')
fout = open('procNr.db', 'a')

line = fin.readline()
line = line.split()

dbtext = getUserName()

cnt = 0
for el in line:
	if cnt % 2 == 0:
		cnt += 1
		continue
	if cnt == 1:
		dbtext += '","totalpr":"' + el
	elif cnt == 3:
		dbtext += '","running":"' + el
	elif cnt == 5:
		dbtext += '","sleeping":"' + el
	elif cnt == 7:
		dbtext += '","stopped":"' + el
	elif cnt == 9:
		dbtext += '","zombie":"' + el
	cnt += 1

dbtext += tid.getTimeStamp() + tid.getID()
print(dbtext)

fout.write(dbtext)
fout.flush()

fin.close()
fout.close()


