#!/bin/bash
#This script gets the list of k8s resource and creates ansible code in the operator
resource=$1
rolename=$2
operatorDirectory=$3
IFS=$'\n';

echo "Creating code for ${resource}"

kubectl-neat get "$resource" -o yaml > temp.yml
yq eval '.metadata.namespace = "{{ ansible_operator_meta.namespace }}"' -i temp.yml
yq eval '[{"name":"Create '$resource'","k8s": {"definition": .}}]' temp.yml >> ${operatorDirectory}/roles/${rolename}/tasks/main.yml
rm -rf temp.yml