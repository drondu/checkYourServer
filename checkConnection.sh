# cat /tmp/check_connectivity.sh
#!/bin/bash

server=10.238.184.1     # server IP
port=22                 # port
connect_timeout=5       # Connection timeout

timeout $connect_timeout bash -c "</dev/tcp/$server/$port"
if [ $? == 0 ]
then
   echo "1" > isconnavail.txt
else
   echo "0" > isconnavail.txt
fi
