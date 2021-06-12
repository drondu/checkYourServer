#! /usr/bin/p9ython
import time
import sys
sys.path.append('../pyHelpers')

from gethost import getUserName
import timeandid as tid
import time

fin1 = open('estbConn.txt','r')
fin2 = open('lstnConn.txt','r')
fout = open('../DBs/connectionsUsage.db', 'a')


dbtext = getUserName()

temp = fin1.readline().rstrip()
dbtext += '","estbconn":"' + temp;		

temp = fin2.readline().rstrip()
dbtext += '","lstnconn":"' + temp;		

dbtext += tid.getTimeStamp() + tid.getID()

# print(dbtext)
fout.write(dbtext)


fout.close()		
fin1.close()
fin2.close()
