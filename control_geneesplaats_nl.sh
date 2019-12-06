#!/usr/bin/env bash 
set -x 
set -e

Functions=('build' 'deploy' 'release' 'stop' 'clean')
Environments=('development' 'testing' 'stash' 'production')



build() {
    echo build
}

deploy() {
    echo deploy
}

stop() {
    echo stop
}

clean() {
    echo clean
}

release() {
    #check if we have configuration set
    if [[ ! -f ./.docker-env-$ENVIRONMENT ]]; then
        #not set so lets generate it
        ./generate_docker_env.sh $ENVIRONMENT $RELEASE_VERSION
    fi
    echo Release geneesplaats.nl for $ENVIRONMENT environment -- release $RELEASE_VERSION

    echo environment variabels:
    cat ./.env
    . ./.env
    docker-compose -f docker-compose-$ENVIRONMENT.yml  up --no-build

    #todo
    #docker stack deploy my-stack --compose-file docker-compose.yml --with-registry-auth
}


if [[ $# < 2 ]]; then
    echo Error: at least 2 parameter are required identifying the environment
    echo 
    echo First parameter is "what to do", one of these values:
    echo ${Functions[@]}
    echo Second parameter is "in which environment", one of these values:
    echo ${Environments[@]}
    echo Third optional parameter is "version". If ommited then default value is 'latest'
    exit
fi

FUNCTION=$1
if [[ ! " ${Functions[@]} " =~ " ${FUNCTION} " ]]; then
    echo Error: 1th parameter has to be equal to one of these values: 
    echo     ${Functions[@]}
    exit
fi

ENVIRONMENT=$2
if [[ ! " ${Environments[@]} " =~ " ${ENVIRONMENT} " ]]; then
    echo Error: 2th parameter has to be equal to one of these values: 
    echo     ${Environments[@]}
    exit
fi

if [[ $# > 2 ]]; then
    RELEASE_VERSION=$3
fi
if [[ -z $RELEASE_VERSION ]];then
    RELEASE_VERSION=latest
fi
if [[ ${FUNCTION} == 'build' ]];then
    build
elif [[ ${FUNCTION} == 'deploy' ]];then
    deploy
elif [[ ${FUNCTION} == 'release' ]];then
    release 
elif [[ ${FUNCTION} == 'stop' ]];then
    stop
elif [[ ${FUNCTION} == 'clean' ]];then
    clean
else
    echo Error: none of the functions as defined in Functions:
    echo     ${Functions[@]}
    echo is used. 
    echo Used: ${FUNCTION}
    exit
fi
