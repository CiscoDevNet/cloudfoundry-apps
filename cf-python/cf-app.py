"""Cloud Foundry test"""
from flask import Flask, jsonify
import os
import json

app = Flask(__name__)

@app.route('/')
def getenv():
    print("printing appdynamics environment exposed to applicaiton")
    appd_env = {"appdynamics_env": { env: os.environ[env] for env in os.environ if env.startswith('APPD')}}
    return jsonify(appd_env)
