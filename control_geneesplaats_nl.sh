#!/usr/bin/env bash 
set -x 
set -e

Functions=('build' 'force_build' 'deploy' 'release' 'down' 'stop' 'clean' 'kompose_up' 'kompose_convert')
Environments=('development' 'testing' 'stash' 'production')


generate_env() {
    echo generate environment
    #check if we have configuration set
    if [[ ! -f ./.docker-env-$ENVIRONMENT ]]; then
        #not set so lets generate it
        ./generate_docker_env.sh $ENVIRONMENT $RELEASE_VERSION
    fi
    echo Release geneesplaats.nl for $ENVIRONMENT environment -- release $RELEASE_VERSION

    echo set environment variabels:
    cat ./.env
    . ./.env
}

build() {
    generate_env
    echo build
    docker-compose -f docker-compose-$ENVIRONMENT.yml build
}

force_build() {
    generate_env
    echo force_build
    docker-compose -f docker-compose-$ENVIRONMENT.yml build --no-cache
}

deploy() {
    generate_env
    echo deploy
}

stop() {
    generate_env
    echo stop
}

clean() {
    generate_env
    echo clean
}

release() {
    generate_env
    docker-compose -f docker-compose-$ENVIRONMENT.yml  up --no-build

    #todo
    #docker stack deploy my-stack --compose-file docker-compose.yml --with-registry-auth
}

down() {
    generate_env
    docker-compose -f docker-compose-$ENVIRONMENT.yml  down
}

kompose_up() {
    echo kompose up
    generate_env
    kompose up -v -f docker-compose-$ENVIRONMENT.yml
}

kompose_convert() {
    echo kompose convert
    generate_env
    if [[ -d kompose_$ENVIRONMENT ]]; then
        rm -rf kompose_$ENVIRONMENT
    fi
    mkdir kompose_$ENVIRONMENT

    kompose convert -v -f docker-compose-$ENVIRONMENT.yml -o kompose_$ENVIRONMENT
}

kubectl_apply() {
    echo kubectl apply 
    generate_env
    #get all files in directory kompose_$ENVIRONMENT and make a comma separated list out of it
    kubectl apply -f 
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
elif [[ ${FUNCTION} == 'force_build' ]];then
   force_build 
elif [[ ${FUNCTION} == 'deploy' ]];then
    deploy
elif [[ ${FUNCTION} == 'release' ]];then
    release 
elif [[ ${FUNCTION} == 'down' ]];then
    down 
elif [[ ${FUNCTION} == 'stop' ]];then
    stop
elif [[ ${FUNCTION} == 'clean' ]];then
    clean
elif [[ ${FUNCTION} == 'kompose_up' ]];then
   kompose_up 
elif [[ ${FUNCTION} == 'kompose_convert' ]];then
   kompose_convert
else
    echo Error: none of the functions as defined in Functions:
    echo     ${Functions[@]}
    echo is used. 
    echo Used: ${FUNCTION}
    exit
fi
