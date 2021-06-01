
def getHostName():
	hin = open('../pyHelpers/hostname.txt', 'r')
	name = hin.readline()
	return '{"host":"' + name.rstrip('\n')

def getUserName():
	uin = open('../pyHelpers/username.txt', 'r')
	name = uin.readline()
	return getHostName() + '","uname:","' + name.rstrip('\n')