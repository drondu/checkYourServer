import time

def getDiskSpace(fin):
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


	temp = '","name":"' + name 
	temp += '","used":"' + used 
	temp += '","available":"' + available

	return temp 