#!/bin/bash
#This script gets the list of k8s resource and creates ansible code in the operator
resourceType=$1
rolename=$2
operatorDirectory=$3
resourceArray=$(kubectl get ${resourceType} --output=name)
 
for i in "${resourceArray[@]}"
do
   echo "$i"
   kubectl-neat get ${i} > temp.yml
   yq eval '.metadata.namespace = "{{ ansible_operator_meta.namespace }}"' -i temp.yml
   yq eval '[{"name":"Create ${i}","k8s": {"definition": .}}]' temp.yml >> ${operatorDirectory}/roles/${rolename}/tasks/main.yml

done

rm temp.yml