#! /usr/bin/p9ython 

import sys
sys.path.append('../pyHelpers')

from gethost import getUserName
from diskspace import getDiskSpace
import timeandid as tid

fin = open('cpuFan.txt', 'r')
fout = open('../DBs/cpuFan.db', 'a')

dbtext = getUserName()

temp = fin.readline().rstrip()
dbtext += '","cpufanspeed":"' + temp;		
dbtext += tid.getTimeStamp() + tid.getID()


# print(dbtext)
fout.write(dbtext)
fout.flush()

fin.close()
fout.close()