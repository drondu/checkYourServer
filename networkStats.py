#! /usr/bin/p9ython
from datetime import datetime

import string
import random 
from random import randint

fin = open('net.log','r')
fout = open('netUsage.db', 'a')

Dict = {}
names = []
indexes = []
count = 0
line = fin.readline()
while line:
	indexCnt = 0
	cnt2 = 0
	for el in line.split():
		if indexCnt > len(indexes)-1:
			indexCnt = 0
		if count == 0:
			Dict[line.index(el)] = {'dwnSpeed': [], 'upSpeed': []} 
			names.append(el)
			indexes.append(line.index(el))
			continue
		if count == 1:
			continue
		if cnt2 == 0:
			Dict[indexes[indexCnt]]['dwnSpeed'].append(el)
			cnt2 += 1
			continue
		if cnt2 == 1:	
			Dict[indexes[indexCnt]]['upSpeed'].append(el)
			cnt2 = 0
			indexCnt += 1
	count += 1
	line = fin.readline()


count = 0
for key in indexes:
	Dict[names[count]] = Dict.pop(key)
	count += 1






# ts = int(int(datetime.now().strftime("%s%f"))/1000)
# chars = string.ascii_letters + string.digits



# temp = '{"name:"' + name 
# temp += '","dwnSpeed":"' + dwnSpeed 
# temp += '","upSpeed":"' + upSpeed 
# temp += '","timestamp":' + str(ts)
# temp += ',"_id":"'+ ''.join(random.choices(chars, k=16)) 
# temp +=  '"}\n'

# fout.write(temp)

fin.close()
fout.close()
