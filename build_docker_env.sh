#/usr/bin/env sh

PG_DB=geneesplaats_nl
PG_PASSWORD=`head -c 18 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9' | head -c 12`
PG_SERVICE_NAME=postgres
PG_USER=geneesplaats_nl_user
DOCKER_ACCESS_TOKEN=85e012d5-22c2-46b6-ada4-472616f692bf

echo "POSTGRES_DB=$PG_DB
POSTGRES_PASSWORD=$PG_PASSWORD
POSTGRES_USER=$PG_USER
DATABASE_URL=postgres://$PG_USER:$PG_PASSWORD@$PG_SERVICE_NAME:5432/$PG_DB
SECRET_KEY=`head -c 75 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9' | head -c 50`" > .docker-env
