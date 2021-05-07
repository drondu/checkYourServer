#! /usr/bin/p9ython
from datetime import datetime
import time
import string
import random 
from random import randint

fin = open('net.log','r')
fout = open('netUsage.db', 'a')

# print("123")

def readNames(names):
	time.sleep(1)
	lineCount = 0
	# print('caine')
	line = fin.readline()
	# print('ion')
	print(line)
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


# for n in names: 
# 	print(n)


def readValues():
	lineCount = 0
	names = []
	# print('john in values')
	readNames(names)
	line = fin.readline()
	while line:
		print(line)
		time.sleep(1)
		columnCnt = 0
		namesCnt = 0
		temp = ''
		for el in line.split():
			if namesCnt >= len(names):
				namesCnt = 0
			elif columnCnt >= 2:
				columnCnt = 0
			if columnCnt == 0:
				temp += '{"name":"' + names[namesCnt] 
				temp += '","dwnSpeed":"' + el
			elif columnCnt == 1:
				temp += '","upSpeed":"' + el
				temp += getIdAndTimeStamp()	
				print(temp)
				temp = ''
			columnCnt += 1
			if columnCnt == 2:
				namesCnt += 1
		lineCount += 1

		if lineCount == 21:
			print('\n\n22 linii')
			lineCount = 0	
		if lineCount == 0:
			print('\n\n0 linii')
			# print('ionica')
			readNames(names)
			# print('besica')

		# fout.write(temp)	
		# print(temp) 
		line = fin.readline()

def getIdAndTimeStamp():
	ts = int(int(datetime.now().strftime("%s%f"))/1000)
	chars = string.ascii_letters + string.digits
	temp = '","timestamp":' + str(ts)
	temp += ',"_id":"'+ ''.join(random.choices(chars, k=16)) 
	temp +=  '"}'
	return temp


# print('john')

readValues()

# print(readValues())

# Dict = {}
# names = []
# indexes = []
# count = 0
# line = fin.readline()
# while line:
# 	indexCnt = 0
# 	cnt2 = 0
# 	for el in line.split():
# 		if indexCnt > len(indexes)-1:
# 			indexCnt = 0
# 		if count == 0:
# 			Dict[line.index(el)] = {'dwnSpeed': [], 'upSpeed': []} 
# 			names.append(el)
# 			indexes.append(line.index(el))
# 			continue
# 		if count == 1:
# 			namecount = 0
# 			for key in indexes:
# 				Dict[names[namecount]] = Dict.pop(key)
# 				namecount += 1
# 			continue
# 		if cnt2 == 0:
# 			Dict[names[indexCnt]]['dwnSpeed'].append(el)
# 			cnt2 += 1
# 			continue
# 		if cnt2 == 1:	
# 			Dict[indexes[indexCnt]]['upSpeed'].append(el)
# 			cnt2 = 0
# 			indexCnt += 1
# 	count += 1
# 	line = fin.readline()

# {'eno2': 
# {'dwnSpeed': ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'],
#  'upSpeed': ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00']}, 

# for k, v in Dict.items():
# 	for k1, v1 in v.items():
# 		for el in v1:
# 			temp += '","' + k1 + '":"' + el 
# 			print(temp)
# 			fout.write(temp)

fin.close()
fout.close()
