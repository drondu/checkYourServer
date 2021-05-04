#! /usr/bin/p9ython
from datetime import datetime

import string
import random 
from random import randint

fin = open('diskUsageStripped.txt','r')
fin2 = open('diskTempStripped.txt', 'r')
fout = open('diskUsage.db', 'a')

line = fin2.readline()
line = line.rstrip()

val = ''
for el in line:
	if el.isdigit():
		val += el
		# print(val)
		chars = string.ascii_letters + string.digits

count = 0
line = fin.readline()
for el in line.split():
	if count == 0:
		name = el
	if count == 2:
		used = el
	if count == 3:
		available = el
		break
	count+=1

ts = int(int(datetime.now().strftime("%s%f"))/1000)
chars = string.ascii_letters + string.digits
temp = '{"name:"' + name 
temp += '","used":"' + used 
temp += '","available":"' + available
temp += '","temperature":"' + val 
temp += '","timestamp":' + str(ts)
temp += ',"_id":"'+ ''.join(random.choices(chars, k=16)) 
temp +=  '"}\n'
print('temp: ' + temp)			
fout.write(temp)

fin.close()
fout.close()
