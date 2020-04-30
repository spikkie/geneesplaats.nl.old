#/usr/bin/env bash 
set -x
set -e

. ./generate_docker_env_input.sh

if [[ "${ENVIRONMENT}" = 'production' ]];then
    DEBUG=1
    DJANGO_EXPOSE_PORT=8001
    DJANGO_ALLOWED_HOSTS='localhost 127.0.0.1 [::1]'
    NR_WORKERS=3
    DJANGO_COMMAND="gunicorn --workers=${NR_WORKERS} config.wsgi:application --bind :${DJANGO_EXPOSE_PORT}"
elif [[ "${ENVIRONMENT}" = 'development' ]];then
    DEBUG=1
    DJANGO_EXPOSE_PORT=8002
    DJANGO_ALLOWED_HOSTS='localhost 127.0.0.1 172.21.0.2 [::1]'
    DJANGO_COMMAND="python manage.py runserver 0.0.0.0:${DJANGO_EXPOSE_PORT} -v 3 --traceback --settings=config.settings.${ENVIRONMENT}"
elif [[ "${ENVIRONMENT}" = 'development_test' ]];then
    DEBUG=1
    DJANGO_EXPOSE_PORT=8003
    DJANGO_ALLOWED_HOSTS='localhost 127.0.0.1 [::1]'
    DJANGO_COMMAND="python manage.py runserver 0.0.0.0:${DJANGO_EXPOSE_PORT} --settings=config.settings.${ENVIRONMENT}"
elif [[ "${ENVIRONMENT}" = 'production_test' ]];then
    DEBUG=1
    DJANGO_EXPOSE_PORT=8004
    DJANGO_ALLOWED_HOSTS='localhost 127.0.0.1 [::1]'
    DJANGO_COMMAND="python manage.py runserver 0.0.0.0:${DJANGO_EXPOSE_PORT} --settings=config.settings.${ENVIRONMENT}"
else
    >&2 echo "Error: ENVIRONMENT ${ENVIRONMENT} not correct"
    exit 1
fi

DJANGO_COMMAND_COMMENT="Running ${ENVIRONMENT} server using command: ${DJANGO_COMMAND}"
DOCKER_ACCESS_TOKEN=85e012d5-22c2-46b6-ada4-472616f692bf
DJANGO_SETTINGS_MODULE=config.settings.${ENVIRONMENT}


echo "DEBUG=$DEBUG
ENVIRONMENT=$ENVIRONMENT
DJANGO_EXPOSE_PORT=$DJANGO_EXPOSE_PORT
DJANGO_ALLOWED_HOSTS='$DJANGO_ALLOWED_HOSTS'
DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
DOCKER_ACCESS_TOKEN=${DOCKER_ACCESS_TOKEN} 
DJANGO_COMMAND_COMMENT=${DJANGO_COMMAND_COMMENT}
DJANGO_COMMAND=${DJANGO_COMMAND}" > .docker-env-base-django-${ENVIRONMENT}

if [[ ! -f .docker-env-base-django-${ENVIRONMENT} ]];then
    echo Error: Strange file .docker-env-base-django-${ENVIRONMENT} does not exist
    exit 1
else
    cat .docker-env-base-django-${ENVIRONMENT} > .django_env
fi


# Docker Images
# Docker Image Versions

REPOSITORY=django_geneesplaats_nl_${ENVIRONMENT}
echo "DOCKERID=${DOCKERID}
DJANGO_REPOSITORY=${REPOSITORY}
DJANGO_GENEESPLAATS_NL_IMAGE=${DOCKERID}/${REPOSITORY}
DJANGO_GENEESPLAATS_NL_VERSION=${RELEASE_VERSION}" >> .django_env

echo Generated file .django_env

