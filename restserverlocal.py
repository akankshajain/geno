# Using flask to make an api
# import necessary libraries and functions
from flask import Flask, request, jsonify
import paramiko
import os

# creating a Flask app
app = Flask(__name__)

@app.route('/download', methods = ['POST'])
def create_oper():
    #curl -i -H "Content-Type: application/json" -X POST -d '{"operator":"nodered-operator-demo","path":"/c/dashdbrepos"}' http://localhost:5000/download
    data = request.get_json()
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect('9.30.199.16', username='root', password='akkaFyre2021!Fyre')
    client.exec_command('rm -rf /tmp/' + data['operator'])
    client.exec_command('tar -cvf /tmp/' + data['operator'] + '.tar /root/operators/' + data['operator'])
    print('tar -cvf /tmp/' + data['operator'] + '.tar /root/operators/' + data['operator'])
    os.system("command")
    client.close()
    print('scp root@9.30.199.16:/tmp/' + data['operator'] + '.tar' + " " + data['path'])
    os.system('scp root@9.30.199.16:/tmp/' + data['operator'] + '.tar' + " " + data['path'])
    return jsonify({'data': "hello"})

# Main invocation
if __name__ == '__main__':
    app.run(debug = True, host='localhost', port=5000)

