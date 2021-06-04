#! /usr/bin/p9ython
import sys
sys.path.append('../pyHelpers')

from gethost import getHostName
import timeandid as tid
import time


fin = open('hddTemp.txt', 'r')
fout = open('../diskUsageMother.db', 'a')

names = []
tmps = []
line = fin.readline()
while line:
	n = ''
	t = ''
	elements = line.split()
	cnt = 0 
	for el in elements:
		if cnt == 0:
			cnt += 1
			continue
		if cnt == 1 or cnt == 2:
			n += el + ' '
		if cnt == len(elements) - 1:
			for char in el:
				if char.isdigit():
					t += char
		cnt += 1
	names.append(n)
	tmps.append(t)
	line = fin.readline()

for i in range(len(names)):
	print(names[i] + ' === ' + tmps[i])