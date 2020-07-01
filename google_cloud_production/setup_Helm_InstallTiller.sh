#!/usr/bin/env bash

#https://medium.com/google-cloud/setting-up-google-cloud-with-kubernetes-nginx-ingress-and-lets-encrypt-certmanager-bf134b7e406e

kubectl create serviceaccount --namespace kube-system tiller

kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller

helm init --service-account tiller

kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'

helm init --service-account tiller --upgrade
