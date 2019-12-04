export MY_SERVICE_VERSION=1.2.3
docker stack deploy my-stack --compose-file docker-compose.yml --with-registry-auth
