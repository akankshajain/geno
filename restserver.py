# Using flask to make an api
# import necessary libraries and functions
import genoperator
from utils import operators_dict
from flask import Flask, render_template, url_for, request, redirect, flash, jsonify

# creating a Flask app
app = Flask(__name__)

# on the terminal type: curl http://127.0.0.1:5000/
# returns hello world when we use GET.
# returns the data that we send when we use POST.
@app.route('/', methods = ['GET', 'POST'])
def create_oper():
    if(request.method == 'GET'):

        data = "hello world"
    data = request.get_json()
    return jsonify({'data': data})

####################API Routes########################

# List already created operators
@app.route('/list_opers', methods = ['GET'])
def list_opers():
    if(request.method == 'GET'):
        return operators_dict()


#Create operator out of helm chart
@app.route('/helmoperator', methods = ['POST'])
def createhelmoperator():
    content = request.json
    genoperator.helmoperator(content['helmrepo'],content['helmchartname'],content['operatorname'])  
    # return jsonify({'data': chart_name})
    return "Operator created!"


####################Fron end Routes########################

@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

@app.route('/operators/create')
def create_operator():
    return render_template('createOperator.html')

@app.route('/operators')
def list_operators():
    return render_template('operators.html')

@app.route('/secrets')
def list_secrets():
    return render_template('secrets.html')

# Main invocation
if __name__ == '__main__':

    #app.run(debug = True)
    app.run(debug = True, host='9.30.199.16', port=5000)
