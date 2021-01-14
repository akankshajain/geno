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
