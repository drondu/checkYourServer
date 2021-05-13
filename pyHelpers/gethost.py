
def getHostName():
	hin = open('../hostname.txt', 'r')
	name = hin.readline()
	return name.rstrip('\n')
