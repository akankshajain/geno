#!/bin/bash
#This script gets the list of k8s resource and creates ansible code in the operator
resource=$1
IFS=$'\n';

rm -rf temp.yml
kubectl-neat get "$resource" -o yaml > temp.yml

