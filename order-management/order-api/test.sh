#!/bin/bash

IP=$1

response=$(curl -s --max-time 5 -o /dev/null -w "%{http_code}" http://$IP:3000)

if [ "$response" == "200" ]; then
  echo "Application is running successfully!"
else
  echo "Application failed! Status: $response"
fi