#! /usr/bin/p9ython
from datetime import datetime
import time
import string
import random 
from random import randint

fin = open('net.log','r')
fout = open('netUsage.db', 'a')

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

def getHostName():
	hin = open('../hostname.txt', 'r')
	name = hin.readline()
	hin.close()
	return name.rstrip('\n')


def readValues():
	lineCount = 0
	names = []
	readNames(names)
	line = fin.readline()
	while line:
		time.sleep(1)
		columnCnt = 0
		namesCnt = 0
		for el in line.split():
			if namesCnt >= len(names):
				namesCnt = 0
			elif columnCnt >= 2:
				columnCnt = 0
			if columnCnt == 0:
				temp = '{"host":"' + getHostName()
				temp += '","name":"' + names[namesCnt] 
				temp += '","dwnSpeed":"' + el
			elif columnCnt == 1:
				temp += '","upSpeed":"' + el
				temp += getIdAndTimeStamp()	
				#print(temp)
				fout.write(temp)
				fout.flush()
				temp = ''
			columnCnt += 1
			if columnCnt == 2:
				namesCnt += 1
		lineCount += 1

		if lineCount == 21:
			lineCount = 0	
		if lineCount == 0:
			readNames(names)			 
		line = fin.readline()

def getIdAndTimeStamp():
	ts = int(int(datetime.now().strftime("%s%f"))/1000)
	chars = string.ascii_letters + string.digits
	temp = '","timestamp":' + str(ts)
	temp += ',"_id":"'+ ''.join(random.choices(chars, k=30)) 
	temp +=  '"}\n'
	return temp


getHostName()
readValues()

fin.close()
fout.close()
