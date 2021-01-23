import subprocess;
import datetime;

def helmoperator(helmrepo, helmchart, operatorname):
    result = subprocess.run(["helm", "repo", "add", "bitnami", helmrepo],  stdout=subprocess.PIPE)
    print("output %s" % result)
    operatorDirectory="/root/operators/"+operatorname

    result = subprocess.run(["mkdir", operatorDirectory],  stdout=subprocess.PIPE)
    print("output %s" % result)
    result = subprocess.run(["operator-sdk", "init", "--plugins=helm", "--helm-chart", helmchart], cwd=operatorDirectory, stdout=subprocess.PIPE)
    print("output %s" % result)
    ct = datetime.datetime.now()
    date_time = ct.strftime("%m/%d/%Y %H:%M:%S")
    with open('database/operators.csv', 'a') as f:
     f.write(operatorname+",helm,"+date_time+","+operatorDirectory+"\n")     
    return


def ansibleoperatorfromk8s(groupname, domainname, operatorname, version, kinds, namespace):

    operatorDirectory="/root/operators/"+operatorname

    result = subprocess.run(["mkdir", operatorDirectory],  stdout=subprocess.PIPE)
    print("output %s" % result)
    result = subprocess.run(["operator-sdk", "init", "--plugins=ansible", "--domain", domainname], cwd=operatorDirectory, stdout=subprocess.PIPE)
    print("output %s" % result)
    #print(kinds)
    #Create each kind given in "kinds" list
    for kind in kinds:
        #print(kind)
        result = subprocess.run(["operator-sdk", "create","api","--group",groupname,"--version",version, "--kind", kind['name'].capitalize(),"--generate-role"], cwd=operatorDirectory, stdout=subprocess.PIPE)
        print("output %s" % result)

        for resource in kind['resourcenames']:
            print("Creating code for "+resource)
            result = subprocess.run(["sh", "createAnsibleCode.sh", resource, kind['name'].lower(), operatorDirectory], stdout=subprocess.PIPE)
            print("Resource created %s" % result)

    ct = datetime.datetime.now()
    date_time = ct.strftime("%m/%d/%Y %H:%M:%S")
    with open('database/operators.csv', 'a') as f:
        f.write(operatorname+",from kubernetes,"+date_time+","+operatorDirectory+"\n")
    return

def ansibleoperatorfromscratch(groupname, domainname, operatorname, version, kinds, namespace):

    operatorDirectory="/root/operators/"+operatorname

    result = subprocess.run(["mkdir", operatorDirectory],  stdout=subprocess.PIPE)
    print("output %s" % result)
    result = subprocess.run(["operator-sdk", "init", "--plugins=ansible", "--domain", domainname], cwd=operatorDirectory, stdout=subprocess.PIPE)
    print("output %s" % result)
    
    #Create each kind given in "kinds" list
    for kind in kinds:
        print(kind)
        result = subprocess.run(["operator-sdk", "create","api","--group",groupname,"--version",version, "--kind", kind['name'].capitalize(),"--generate-role"], cwd=operatorDirectory, stdout=subprocess.PIPE)
        print("output %s" % result)
        
        
    
    ct = datetime.datetime.now()
    date_time = ct.strftime("%m/%d/%Y %H:%M:%S")
    with open('database/operators.csv', 'a') as f:
        f.write(operatorname+",from scratch,"+date_time+","+operatorDirectory+"\n")
    return


        #Sort the resources in the order their code should be created
        #orderOfResources = [ "Secret","ConfigMap", "PersistentVolumeClaim", "Service","Pod","Deployment",  "StatefulSet", "Job", "Cronjob", "Route","NetworkPolicy"]
        #orderOfCreation = sorted(kind.resourcenames, key=lambda x: orderOfResources.index(x))