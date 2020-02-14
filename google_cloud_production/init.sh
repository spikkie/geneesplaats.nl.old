#!/usr/bin/env bash
set -x

gcloud config configurations activate cloudshell-32705
gcloud container clusters create geneesplaats-nl-cluster-1 --zone europe-west4-a --num-nodes=2


