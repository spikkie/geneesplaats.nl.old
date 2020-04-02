#!/usr/bin/env bash
set -x
set -e

#Notes
# login using token/ + refresh/ and not using login/
#
# POST data send via a request doesn"t have to be in json format 
# this is handled by the Django Rest framework

echo django-rest-auth

email=spikkie@gmail.com
password=22222222

LOGIN_TOKEN=$(curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' --data "{\"email\": \"${email}\", \"password\": \"${password}\"}" http://127.0.0.1:8001/api/v1/rest-auth/login/ | jq -r '.token')

TOKEN=$(curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' --data "{\"email\": \"${email}\", \"password\": \"${password}\"}" http://127.0.0.1:8001/api/v1/token/')

REFRESH_TOKEN=$(curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' -d '{"token":"${TOKEN}"}' http://127.0.0.1:8001/api/v1/token/refresh/' )




##api/v1/schema
#skip for now but is working with TOKEN
#curl -X GET  http://127.0.0.1:8001/api/v1/schema -H "Authorization: JWT ${LOGIN_TOKEN}"

##api/v1/
