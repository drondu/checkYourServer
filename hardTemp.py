#! /usr/bin/p9ython
from datetime import datetime

import string
import random 
from random import randint

fin = open('ion.txt','r')
fout = open('database.db', 'a')

temp = ''
counter = 0
val = ''

while True:
	x = fin.readline()
	x = x.rstrip()
	if not x: break
	++counter
	for el in x:
		if el.isdigit():
			ts = int(int(datetime.now().strftime("%s%f"))/1000)
			val += el
			chars = string.ascii_letters + string.digits
			# rid = ''.join(random.choices(chars, 16))
	temp = '{"temperature":"' + val + '","year":"' + str(randint(1, 1000)) + '","timestamp":' + str(ts) + ',"_id":"'+ ''.join(random.choices(chars, k=16)) + '"}' 
	temp += '\n'

print('temp: \n' + temp)			
fout.write(temp)

fin.close()
fout.close()
