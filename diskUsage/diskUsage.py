#! /usr/bin/p9ython
from datetime import datetime
import time
import string
import random 
from random import randint

def getHostName():
	hin = open('../hostname.txt', 'r')
	name = hin.readline()
	return name.rstrip('\n')



fin = open('diskUsageStripped.txt','r')
fin2 = open('diskTempStripped.txt', 'r')
fout = open('../DBs/diskUsageMother.db', 'a')

line = fin2.readline()
line = line.rstrip()


val = ''
for el in line:
	if el.isdigit():
		val += el

chars = string.ascii_letters + string.digits
# time.sleep(0.5)

count = 0
line = fin.readline()
for el in line.split():
	time.sleep(0.1)
	if count == 0:
		name = el
	if count == 2:
		el.rstrip()
		temp = ''
		for nb in el:
			if nb.isdigit():
				temp += nb		
		used = temp
	if count == 3:
		el.rstrip()
		temp = ''
		for nb in el:
			if nb.isdigit():
				temp += nb
		available = temp
		
	count+=1

ts = int(int(datetime.now().strftime("%s%f"))/1000)
chars = string.ascii_letters + string.digits
temp = '{"host":"' + getHostName()
temp += '","name":"' + name 
temp += '","used":"' + used 
temp += '","available":"' + available
temp += '","temperature":"' + val 
temp += '","timestamp":' + str(ts)
temp += ',"_id":"'+ ''.join(random.choices(chars, k=30)) 
temp +=  '"}\n'
# print('temp: ' + temp)			
fout.write(temp)
fout.flush()

fin.close()
fout.close()
