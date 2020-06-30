#!/usr/bin/env bash 
set -x

unset IC_IP
unset IC_HTTPS_PORT
unset IC_HTTP_PORT

kubectl delete -f $(ls  -p *.yaml  | grep -v / | tr '\n' ','  | sed 's/.$//')
