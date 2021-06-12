#! /usr/bin/p9ython 

import sys
sys.path.append('../pyHelpers')

from gethost import getUserName
import timeandid as tid

fin = open('drawnWats.txt', 'r')
fout = open('watsUsage.db', 'a')

dbtext = getUserName()

temp = fin.readline().rstrip()
dbtext += '","drawn_wats":"' + temp;		
dbtext += tid.getTimeStamp() + tid.getID()


# print(dbtext)
fout.write(dbtext)
fout.flush()

fin.close()
fout.close()