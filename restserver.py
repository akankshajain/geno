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


# List already created operators
@app.route('/list_opers', methods = ['GET'])
def list_opers():
    if(request.method == 'GET'):
        return operators_dict()


# A simple function to calculate the square of a number
# the number to be squared is sent in the URL when we use GET
# on the terminal type: curl http://127.0.0.1:5000 / home / 10
# this returns 100 (square of 10)
@app.route('/helmoperator', methods = ['POST'])
def createhelmoperator():
    content = request.json
    genoperator.helmoperator(content['helmrepo'],content['helmchartname'],content['operatorname'])  
    # return jsonify({'data': chart_name})
    return "Operator created!"

@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

@app.route('/operators/create')
def create_operator():
    return render_template('createOperator.html')

# Main invocation
if __name__ == '__main__':

    #app.run(debug = True)
    app.run(debug = True, host='9.30.199.16', port=5000)

