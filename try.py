import time

# define the name of the file to read from
filename = "net.log"
# time.sleep(0.5)
# open the file for reading
filehandle = open(filename, 'r')
while True:
	time.sleep(1) 	
	# read a single line
	line = filehandle.readline()
	if not line:
		print('nope')
	    # break
	print(line)

# close the pointer to that file
filehandle.close()
