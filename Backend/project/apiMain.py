from fileinput import filename
from locale import currency
from sqlite3 import paramstyle
from itertools import repeat
# from django.shortcuts import render
from flask import (
    Flask,
    app,
    render_template,
    redirect,
    request,
    url_for,
    flash,
    session,
    Blueprint,
    escape,
    current_app,
    jsonify,
    json,
    make_response,
    send_file,
    send_from_directory,
    Response,
)
import pymssql
import datetime
from datetime import date, timedelta, timezone
import time
import pandas as pd
import statistics
import math
import calendar
from calendar import monthrange
from num2words import num2words
import uuid
from io import BytesIO
from fpdf import FPDF
import decimal
import qrcode
import base64
import requests
import uuid
from fiscalyear import *
import fiscalyear
import logging
import os
import numpy as np
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import base64
from Cryptodome.Cipher import AES
import socket
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from io import StringIO
from flask_wtf.csrf import CSRFProtect
from werkzeug.security import generate_password_hash, check_password_hash


csrf = CSRFProtect()

apiMain = Blueprint('apiMain', __name__)

def csrf_error(reason):
    return ("CSRF Error: ", reason)


@apiMain.route('/app/signup', methods=['POST'])
def appSignup():
    if request.method=='POST':
        data = request.get_json()
        key = request.headers.get('API_KEY')
        email = data['email']
        password = data['password']
        passwordHashed = generate_password_hash(password, method='sha256')

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM userAuthApp WHERE email=%s"
        val = (email, )
        cursor.execute(sql, val)
        user = cursor.fetchall()

        if user:
            data = {'statusCode':'0', 'apiMessage':'Email already registered! Signup with a new email.'}
            resp = make_response(jsonify(data), 200)
            resp.headers['Content-Type'] = 'application/json'
            return resp
        
        else:
            try:
                id = str(uuid.uuid4())
                userName = "Rajat"
                signupDate = datetime.datetime.now()
                sql = "INSERT INTO userAuthApp (id,name,email,password,signupDate) VALUES (%s, %s, %s, %s, %s)"
                val = (id, userName, email, passwordHashed, signupDate)
                cursor.execute(sql,val)
                connLocal.commit()
                cursor.close()
                connLocal.close()
                data = {'statusCode':'1', 'apiMessage':'User Registered Successfully'}
                resp = make_response(jsonify(data),200)
                resp.headers['Content-Type'] = 'application/json'
                return resp
            except Exception as e:
                data = {'statusCode':'1', 'apiMessage':'User Registered Successfully', 'token':e}
                resp = make_response(jsonify(data),200)
                resp.headers['Content-Type'] = 'application/json'
                return resp

@apiMain.route('/app/login', methods=['POST'])
def appLogin():
    if request.method=='POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM userAuthApp WHERE email=%s"
        val = (email, )
        cursor.execute(sql, val)
        sqlData = cursor.fetchall()

        if not sqlData:
            respData = {'apiMessage':"No user found with this email. Please signup first."}
            resp = make_response(jsonify(respData),200)
            return resp
        elif not check_password_hash(sqlData[0][3], password):
            respData = {'apiMessage':"Incorrect password! Try again."}
            resp = make_response(jsonify(respData),200)
            return resp
        else:
            timeNow = datetime.datetime.now()
            sql = "UPDATE userAuthApp SET lastLogin=%s WHERE email=%s"
            val = (timeNow, email)
            cursor.execute(sql, val)
            connLocal.commit()

            sql = "SELECT id from userAuthApp WHERE email=%s"
            val = (email, )
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            userId = sqlData[0][0]
            print("User Id: ", sqlData)
            
            sql = "SELECT * FROM appToken WHERE email=%s"
            val = (email, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            print("I am here")

            if sqlData:
                print("I am hre: ", email)
                sql = "DELETE FROM appToken WHERE email=%s"
                val = (email, )
                cursor.execute(sql, val)
                connLocal.commit()
            
            token = str(uuid.uuid4())
            tokenCreationTime = datetime.datetime.now()
            tokenExpiryTime = tokenCreationTime + timedelta(minutes=60)

            sql = "INSERT INTO appToken (token, email, creationTime, expiryTime, userId) VALUES (%s,%s,%s,%s,%s)"
            val = (token, email, tokenCreationTime, tokenExpiryTime, userId)
            cursor.execute(sql, val)
            connLocal.commit()
            cursor.close()
            connLocal.close()
            respData = {'apiMessage':'login successful', 'token':token, 'tokenExpiryTime':tokenExpiryTime, 'userId':userId}
            resp = make_response(jsonify(respData), 200)
            return resp
        
@apiMain.route('/app/checkToken', methods=['POST'])
def appCheckToken():
    if request.method=='POST':
        data = request.get_json()
        key = request.headers.get('API_KEY')
        email = data['email']
        token = data['token']

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM appToken WHERE email=%s AND token=%s"
        val = (email, token)
        cursor.execute(sql,val)
        sqlData = cursor.fetchall()
        tokenExpiryTime = sqlData[0]['expiryTime']
        timeNow = datetime.datetime.now()
        if timeNow < tokenExpiryTime:
            respData = {'apiMessage': 'valid'}
        else:
            respData = {'apiMessage':'invalid'}

        resp = make_response(jsonify(respData), 200)
        resp.headers['Content-Type'] = 'application/json'
        return resp

@apiMain.route('/app/getAllTopics', methods=['POST'])
def appGetAllTopics():
    if request.method == 'POST':

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM topicMaster WHERE status='active'"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        topicList = []
        for i in range(0,len(sqlData)):
            dict = {
                'id': sqlData[i][0],
                'topic': sqlData[i][1],
                'iconLink': sqlData[i][3]
            }
            print("dict: ", dict)
            topicList.append(dict)
        print(topicList)
        respData = {'topicList':topicList, 'apiMessage':'success'}
        resp = make_response(jsonify(respData),200)
        return resp

@apiMain.route('/app/getMyTopics', methods=['POST'])
def appGetMyTopics():
    if request.method == 'POST':
        print("Entered the apiMain")
        apiData = request.get_json()
        email = apiData['email']
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT topicId, topic, iconLink FROM userTopicMaster WHERE email=%s"
        val = (email, )
        cursor.execute(sql, val)
        sqlData = cursor.fetchall()
        myTopicList = []
        for i in range(0,len(sqlData)):
            dict = {
                'id':sqlData[i][0],
                'topic':sqlData[i][1],
                'iconLink': sqlData[i][2]
            }
            myTopicList.append(dict)

        print("Data: ", myTopicList)
        respData = {'apiMessage':'success', 'myTopicList':myTopicList}
        resp = make_response(jsonify(respData),200)
        return resp

@apiMain.route('/app/removeTopic', methods=['POST'])
def appRemoveTopic():
    if request.method == 'POST':
        try:
            apiData = request.get_json()
            userEmail = apiData['email']
            topicId = apiData['topicId']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "DELETE FROM userTopicMaster WHERE email=%s and topicId=%s"
            val = (userEmail, topicId)
            cursor.execute(sql, val)
            connLocal.commit()
            cursor.close()
            connLocal.close()

            respData = {'apiMessage':"success"}
            resp = make_response(jsonify(respData),200)
            return resp
        
        except Exception as e:
            respData = {'apiMessage':e}
            resp = make_response(jsonify(respData),200)
            return resp
    
@apiMain.route('/app/addTopic', methods=['POST'])
def appAddTopic():
    if request.method == 'POST':
        try: 
            data = request.get_json()
            userEmail = data['email']
            topicId = data['topicId']
            userId = data['userId']
            topic = data['topic']
            iconLink = data['iconLink']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM userTopicMaster WHERE email=%s AND topicId=%s"
            val = (userEmail, topicId)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            if not sqlData:
                sql = "INSERT INTO userTopicMaster (userId, email, topicId, topic, iconLink) VALUES (%s, %s, %s, %s, %s)"
                val = (userId, userEmail, topicId, topic, iconLink)
                cursor.execute(sql, val)
                connLocal.commit()
                cursor.close()
                connLocal.close()

            respData = {'apiMessage':"success"}
            resp = make_response(jsonify(respData),200)

            return resp
        
        except Exception as e:
            respData = {'apiMessage':e}
            resp = make_response(jsonify(respData),200)
            return resp



