#!/usr/bin/env bash

release_dir='release_geneesplaats_nl'

if [ ! -d $release_dir ]; then
    echo  release directory $release_dir does not exist
else
    cp docker-compose.yml $release_dir/
    cp .docker-env $release_dir/
fi

