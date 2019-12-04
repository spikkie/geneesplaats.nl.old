export MY_SERVICE_VERSION=1.2.3
export API_ENDPOINT=http://staging.my-api.com
docker stack deploy my-stack --compose-file docker-compose.yml --with-registry-auth
