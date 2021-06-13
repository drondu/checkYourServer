#! /usr/bin/p9ython 

import sys
sys.path.append('../pyHelpers')

from gethost import getUserName
import timeandid as tid

fin = open('ramStats.txt', 'r')
fout = open('ramUsage.db', 'a')

line = fin.readline()
line = fin.readline()


total = ''
used = ''
free = ''
share = ''
cache = ''
shared = ''
avail = ''

linecnt = 1

while line: 
	# print('\n\n' + line)

	line = line.split()
	dbtext = getUserName()
	if linecnt == 1:
		dbtext += '","type":"ram",'
	elif linecnt == 2:
		dbtext += '","type":"swap",'
	elif linecnt == 3:
		break;
	cnt = 0		
	for el in line:

		if cnt == 0:
			cnt += 1
			continue

		tmp = ''
		unit = 'G'
		# print(el)
		el.rstrip()
		for i in el:
			if i.isdigit():
				tmp += i
			elif i == ',':
				tmp += '.'
			elif i == 'M':
				unit = 'M'
			elif i == 'K':
				unit = 'K'
		
		val = float(tmp)
		# print(val)

		if unit == 'M':
			val = val / 1024
		elif unit == 'K':
			val = val / 1024 / 1024
		# print(val)

		if cnt == 1:
			dbtext += '"total":"' + str(val)
		elif cnt == 2:
			dbtext += '","used":"' + str(val)
		elif cnt == 3:
			dbtext += '","free":"' + str(val)
			# free = val
		elif linecnt == 2:
			cnt += 1
			break
		elif cnt == 4:
			dbtext += '","shared":"' + str(val)
			# shared = val
		elif cnt == 5:
			dbtext += '","cache":"' + str(val)
			# cache = val
		elif cnt == 6:
			dbtext += '","avail":"' + str(val)
			# avail = val
		cnt += 1
	
	linecnt += 1	

	
	dbtext += tid.getTimeStamp() + tid.getID()
	print(dbtext)
	fout.write(dbtext)
	line = fin.readline()
	fout.flush()



fin.close()
fout.close()