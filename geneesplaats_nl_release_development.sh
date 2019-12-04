export POSTGRES_VERSION = latest
export DJANGO_GENEESPLAATS_NL_VERSION = latest

export DJANGO_SETTINGS_MODULE=config.settings.development
export MY_SERVICE_VERSION=1.2.3
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml push
docker-compose -f docker-compose.yml up
