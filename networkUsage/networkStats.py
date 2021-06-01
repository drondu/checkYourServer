#! /usr/bin/p9ython
import time
import sys
sys.path.append('../pyHelpers')

from gethost import getUserName
import timeandid as tid
import time

fin = open('net.log','r')

def readNames(names):
	time.sleep(1)
	lineCount = 0
	line = fin.readline()
	while line and lineCount < 2:
		time.sleep(1)
		for el in line.split():
			if lineCount == 0: 
				names.append(el)
				continue
			if lineCount == 1:
				break
			
		lineCount += 1
		line = fin.readline()

def readValues():
	lineCount = 0
	names = []
	# print("hope")
	readNames(names)
	line = fin.readline()
	while line:
		# print("john")
		fout = open('../DBs/netUsageMother.db', 'a')
		time.sleep(1)
		columnCnt = 0
		namesCnt = 0
		for el in line.split():
			if namesCnt >= len(names):
				namesCnt = 0
			elif columnCnt >= 2:
				columnCnt = 0
			if columnCnt == 0:
				temp = getUserName()
				temp += '","name":"' + names[namesCnt] 
				temp += '","dwnSpeed":"' + el
			elif columnCnt == 1:
				temp += '","upSpeed":"' + el
				temp += tid.getTimeStamp() + tid.getID()	
				print(temp)
				fout.write(temp)
				fout.flush()
				temp = ''
			columnCnt += 1
			if columnCnt == 2:
				namesCnt += 1
		fout.close()
		lineCount += 1

		if lineCount == 21:
			lineCount = 0	
		if lineCount == 0:
			readNames(names)
			 
		line = fin.readline()


#readNames()
readValues()

fin.close()
