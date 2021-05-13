from datetime import datetime
# import time
import string
import random


def getTimeStamp():
	ts = int(int(datetime.now().strftime("%s%f"))/1000)
	return '","timestamp":' + str(ts)


def getID():
	chars = string.ascii_letters + string.digits	
	return ',"_id":"'+ ''.join(random.choices(chars, k=30)) + '"}\n'

