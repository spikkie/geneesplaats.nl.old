#!/usr/bin/env bash

if [ ! -f .docker-env ]; then
    echo run build_docker_env.sh
    ./build_docker_env.sh
fi

echo 85e012d5-22c2-46b6-ada4-472616f692bf | docker login --username spikkie --password-stdin

docker-compose push django
docker-compose push postgres

docker logout




