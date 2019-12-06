release-dev:
	./release_geneesplaats_nl.sh development

release-prod:
	./release_geneesplaats_nl.sh production

release-stash:
	./release_geneesplaats_nl.sh stash

release-test:
	./release_geneesplaats_nl.sh testing

stop-dev:
	@eval docker stop $$(docker ps -a -q)
	docker-compose down

ssh-nginx:
	docker exec -it nginx_server bash

ssh-django-web:
	docker exec -it django_web bash

ssh-db:
	docker exec -it db bash

ssh-es:
	docker exec -it es bash

ssh-kibana:
	docker exec -it kibana bash

check-network-config-details:
	docker network inspect bookme_default

build-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

build-dev:
	docker-compose build
