#/usr/bin/env bash 
set -x
set -e

Environments=('development' 'testing' 'stash' 'production')

if [[ $# < 1 ]]; then
    echo Error: 1 parameter required identifying the environment
    echo One of these values:
    echo ${Environments[@]}
    exit
fi

ENVIRONMENT=$1

if [[ ! " ${Environments[@]} " =~ " ${ENVIRONMENT} " ]]; then
    echo Error: 1 parameter has to be equal to one of these values: 
    echo     ${Environments[@]}
    exit
fi


if [[ $# > 1 ]]; then
    RELEASE_VERSION=$2
fi

if [[ -z $RELEASE_VERSION ]];then
    RELEASE_VERSION=latest
fi

echo Generating docker_env for $ENVIRONMENT environment -- release $RELEASE_VERSION



#.docker-env-base-${ENVIRONMENT} will only be generated once
if [[ ! -f .docker-env-base-${ENVIRONMENT} ]];then
    PG_DB=${ENVIRONMENT}_geneesplaats_nl
    PG_USER=${ENVIRONMENT}_geneesplaats_nl_user
    PG_PASSWORD=`head -c 18 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9' | head -c 12`
    PG_SERVICE_NAME=postgres
    DOCKER_ACCESS_TOKEN=85e012d5-22c2-46b6-ada4-472616f692bf
    DEBUG=1
    PRODUCTION='false'
    DJANGO_EXPOSE_PORT=8001
    DJANGO_SETTINGS_MODULE=config.settings.development

    if [[ $ENVIRONMENT == 'production' ]];then
        PRODUCTION='true'
        DEBUG=1
        DJANGO_SETTINGS_MODULE=config.settings.production
    fi


    echo "POSTGRES_DB=$PG_DB
POSTGRES_USER=$PG_USER
POSTGRES_PASSWORD=$PG_PASSWORD
DATABASE_URL=postgres://$PG_USER:$PG_PASSWORD@$PG_SERVICE_NAME:5432/$PG_DB
SECRET_KEY=`head -c 75 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9' | head -c 50`
DEBUG=$DEBUG
PRODUCTION=$PRODUCTION
ENVIRONMENT=$ENVIRONMENT
DJANGO_EXPOSE_PORT=$DJANGO_EXPOSE_PORT
DJANGO_ALLOWED_HOSTS='localhost 127.0.0.1 [::1]'
DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE" > .docker-env-base-${ENVIRONMENT}
fi

if [[ ! -f .docker-env-base-${ENVIRONMENT} ]]; then
    echo Error: Strange file .docker-env-base-${ENVIRONMENT} does not exist
    exit
fi

cat .docker-env-base-${ENVIRONMENT} > .env
echo "POSTGRES_GENEESPLAATS_NL_VERSION=${RELEASE_VERSION}
DJANGO_GENEESPLAATS_NL_VERSION=${RELEASE_VERSION}
NGINX_GENEESPLAATS_NL_VERSION=${RELEASE_VERSION} " >> .env

echo Generated file .env

