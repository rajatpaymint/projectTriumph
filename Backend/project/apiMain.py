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
from calendar import monthrange
from num2words import num2words
import uuid
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
from werkzeug.security import generate_password_hash, check_password_hash
import markdown
import boto3

# AKIAU6GD2L4PU4QJEBNU
# dgLZ4Ah8WCBAyuEUBOxUj8RfmcIBbFtjLi4r4Gtz

apiMain = Blueprint('apiMain', __name__)

@apiMain.route('/app/test', methods=['GET'])
def test():
    if request.method == 'GET':
        try:
            return "Rajat"
        except Exception as e:
            return e


@apiMain.route('/app/signup', methods=['POST'])
def appSignup():
    if request.method=='POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        passwordHashed = generate_password_hash(password, method='sha256')
        name= data['name']
        city= data['city']
        mobileNumber = data['number']


        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM userAuthApp WHERE email=%s"
        val = (email, )
        cursor.execute(sql, val)
        user = cursor.fetchall()

        if user:
            data = {'statusCode':1, 'apiMessage':'Email already registered! Signup with a new email.'}
            resp = make_response(jsonify(data), 200)
            resp.headers['Content-Type'] = 'application/json'
            return resp
        
        else:
            try:
                id = str(uuid.uuid4())
                signupDate = datetime.datetime.now()
                sql = "INSERT INTO userAuthApp (id,name,email,mobileNumber,city,password,signupDate) VALUES (%s, %s, %s, %s, %s,%s,%s)"
                val = (id, name, email, mobileNumber,city,passwordHashed, signupDate)
                cursor.execute(sql,val)
                connLocal.commit()
                cursor.close()
                connLocal.close()
                data = {'statusCode':0, 'apiMessage':'User registered successfully!'}
                resp = make_response(jsonify(data),200)
                resp.headers['Content-Type'] = 'application/json'
                return resp
            except Exception as e:
                data = {'statusCode':2, 'apiMessage':'Error in registration, please try again!', 'error':e}
                resp = make_response(jsonify(data),200)
                resp.headers['Content-Type'] = 'application/json'
                return resp

@apiMain.route('/app/login', methods=['POST'])
def appLogin():
    if request.method=='POST':
        print("Entered Here")
        data = request.get_json()
        email = data['email']
        password = data['password']
        
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM userAuthApp WHERE email=%s"
        val = (email, )
        cursor.execute(sql, val)
        sqlData = cursor.fetchall()
        print(sqlData)

        if not sqlData:
            respData = {'statusCode':1, 'apiMessage':"No user found with this email. Please signup first."}
            resp = make_response(jsonify(respData),200)
            return resp
        elif not check_password_hash(sqlData[0][5], password):
            respData = {'statusCode':2, 'apiMessage':"Incorrect password! Try again."}
            resp = make_response(jsonify(respData),200)
            return resp
        else:
            timeNow = datetime.datetime.now()
            sql = "UPDATE userAuthApp SET lastLogin=%s WHERE email=%s"
            val = (timeNow, email)
            cursor.execute(sql, val)
            connLocal.commit()

            userId = sqlData[0][0]
            name = sqlData[0][1]
            mobile = sqlData[0][3]
            city = sqlData[0][4]
            
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
            respData = {'statusCode':0, 'apiMessage':'login successful', 'token':token, 'tokenExpiryTime':tokenExpiryTime, 'userId':userId, 'name':name, 'mobile':mobile, 'city':city}
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

@apiMain.route('/app/getProfileDetails', methods=['POST'])
def getProfileDetails():
    if request.method=='POST':
        try:
            data = request.get_json()
            email = data['email']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = 'SELECT * FROM userAuthApp WHERE email=%s'
            val = (email,)
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()

            name = sqlData[0][1]
            mobile = sqlData[0][3]
            city = sqlData[0][4]
            signupDate = sqlData[0][6]

            respData = {'statusCode':0, 'apiMessage':'success', 'name':name, 'mobile':mobile, 'city':city, 'signupDate':signupDate}
            resp = make_response(jsonify(respData),200)
            return resp
        
        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'fetchError', 'name':"Null", 'mobile':"Null", 'city':"Null", 'signupDate':"Null"}
            resp = make_response(jsonify(respData),200)
            return resp

@apiMain.route('/app/getNewsletterList', methods=['POST'])
def getNewsletterList():
    if request.method == 'POST':
        try:
            print("Entered into the request")
            data = request.get_json()
            pageLength = data['pageLength']
            currentPage = data['currentPage']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM newsletterMain ORDER BY publishDate DESC OFFSET %s ROWS FETCH NEXT %s ROWS ONLY"
            val = ((currentPage-1)*pageLength,pageLength)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            newsletterList = []
            for i in range(0, len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'headline': sqlData[i][1],
                    'publishDate': sqlData[i][4].date().strftime('%d-%b-%Y'),
                    'createdBy': sqlData[i][5],
                    'imageLink': sqlData[i][6],
                    'fileLink': sqlData[i][7],
                    'isPremium': sqlData[i][8]
                }
                newsletterList.append(dict)
            print("newsletterList: ", newsletterList)
            respData = {'status': 0, 'apiMessage':'success','newsletterList':newsletterList }
            response = make_response(jsonify(respData),200)
            return response
        except Exception as e:
            respData = {'status': 1, 'apiMessage':'fail','newsletterList':[] }
            print("Error: ", e)

@apiMain.route('/app/getSingleArticle', methods=['POST'])
def getSingleArticle():
    if request.method == 'POST':
        try:
            print("I am into the request")
            print(os.environ.get('AWS_ACCESS_KEY_ID'))
            print(os.environ.get('AWS_SECRET_ACCESS_KEY'))
            data = request.get_json()
            id = data['id']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            print("ID: ", id)
            
            sql = "SELECT headline,publishDate,createdBy,imageLink,fileLink FROM newsletterMain WHERE id=%s"
            val =(id,)
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            headline = sqlData[0][0]
            publishDate = sqlData[0][1].date().strftime('%d-%b-%Y') 
            print("Publish Date: ", publishDate)
            createdBy = sqlData[0][2]
            imageLink = sqlData[0][3]
            print("Image Link: ", imageLink)
            fileLink = sqlData[0][4]
            id = data['id']
            s3 = boto3.client('s3')
            bucket_name = 'z2pappstorage1'
            object_key = fileLink

            try:
                print("I am into the s3 equest")
                file = s3.get_object(Bucket=bucket_name, Key=object_key)
                htmlContent = file['Body'].read().decode('utf-8')
                print("HTML Content: ", htmlContent)
            except Exception as e:
                print(e)

            # with open('sampleArticle.html', 'r',encoding='utf-8') as file:
            #     htmlContent = file.read()
            
            responseData = {'statusCode':0, 'content':htmlContent, 'headline':headline, 'publishDate':publishDate,'createdBy':createdBy,'imageLink':imageLink}
            response = make_response(jsonify(responseData),200)
            return response
        
        except Exception as e:
            responseData = {'statusCode':1, 'content':e}
            response = make_response(jsonify(responseData),200)
            return response
        
@apiMain.route('/app/getNewsList', methods=['POST'])
def getNewsList():
    if request.method == 'POST':
        try:
            print("I am here")
            data = request.get_json()
            pageLength = data['pageLength']
            currentPage = data['currentPage']
            print("CurrentPage: ", currentPage)
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM newsMain ORDER BY createdDate DESC OFFSET %s ROWS FETCH NEXT %s ROWS ONLY"
            val = ((currentPage-1)*pageLength,pageLength)
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            print("SqlData: ", sqlData)
            newsList = []
            for i in range(0, len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'createdDate': sqlData[i][1].date().strftime('%d-%b-%Y'),
                    'createdBy': sqlData[i][2],
                    'keywords': sqlData[i][3],
                    'imageLink': sqlData[i][4],
                    'headline': sqlData[i][5],
                    'summary': sqlData[i][6],
                    'articleLink': sqlData[i][7]
                }
                newsList.append(dict)

            respData = {'statusCode':0, 'apiMessage':'success','newsList':newsList}
            response = make_response(jsonify(respData))
            return response

        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'Failed to load','newsList':[]}
            response = make_response(jsonify(respData))
            return response
        
@apiMain.route('/app/getHeadlines', methods=['POST'])
def getHeadlines():
    if request.method == 'POST':
        try:
            data = request.get_json()
            pageLength = data['pageLength']
            currentPage = data['currentPage']
            print("CurrentPage: ", currentPage)
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = 'SELECT id, createdDate, imageLink, headline FROM newsMain ORDER BY createdDate DESC OFFSET %s ROWS FETCH NEXT %s ROWS ONLY'
            val = ((currentPage-1)*pageLength,pageLength)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            headlineList = []
            for i in range(0, len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'createdDate': sqlData[i][1].date().strftime('%d-%b-%Y'),
                    'imageLink': sqlData[i][2],
                    'headline': sqlData[i][3]
                }
                headlineList.append(dict)
            
            print("Headline List: ", headlineList)
            respData = {'statusCode':0, 'apiMessage':'success','headlineList':headlineList}
            response = make_response(jsonify(respData),200)
            return response
            
        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'failed to load','headlineList':[]}
            response = make_response(jsonify(respData),200)
            print(e)
            return response
        
@apiMain.route('/app/getSingleNews', methods=['POST'])
def getSingleNews():
    if request.method=='POST':
        try:
            data = request.get_json()
            id = data['id']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = 'SELECT * FROM newsMain WHERE id=%s'
            val = (id, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            dict = {
                'id':sqlData[0][0],
                'createdDate': sqlData[0][1].date().strftime('%d-%b-%Y'),
                'imageLink': sqlData[0][4],
                'headline': sqlData[0][5],
                'summary': sqlData[0][6],
                'articleLink': sqlData[0][7],
            }
            respData = {'statusCode':0, 'apiMessage':'success','newsItems':dict}
            response = make_response(jsonify(respData),200)
            return response

        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'failed to load','newsItems':[]}
            response = make_response(jsonify(respData),200)
            return response
        
@apiMain.route('/app/getTopics', methods=['POST'])
def getTopics():
    if request.method == 'POST':
        try:
            print("Entered into getTopics Backend")
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            sql = "SELECT * FROM topicMaster WHERE status='active' ORDER BY topic ASC"
            cursor.execute(sql)
            sqlData = cursor.fetchall()
            topicList = []
            print("Entering Loop")
            for i in range(0, len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'topic': sqlData[i][1],
                    'iconLink': sqlData[i][3]
                }
                topicList.append(dict)
            print("Topic List: ", topicList)
            respData = {'statusCode':0, 'apiMessage':'success', 'topicList':topicList}
            response = make_response(jsonify(respData), 200)
            return response
        
        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'failed to load', 'topicList':[]}
            response = make_response(jsonify(respData), 200)
            return response
        
@apiMain.route('/app/getTopicNews', methods=['POST'])
def getTopicNews():
    if request.method =='POST':
        try:
            data = request.get_json()
            id = data['id']
            pageLength = data['pageLength']
            currentPage = data['currentPage']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            sql = "SELECT * FROM newsMain WHERE topic=%s ORDER BY createdDate DESC OFFSET %s ROWS FETCH NEXT %s ROWS ONLY"
            val = (id, (currentPage-1)*pageLength, pageLength)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            newsList = []
            if (len(sqlData)>0):
                for i in range(0, len(sqlData)):
                    dict = {
                        'id': sqlData[i][0],
                        'createdDate': sqlData[i][1].date().strftime('%d-%b-%Y'),
                        'imageLink': sqlData[i][4],
                        'headline': sqlData[i][5],
                        'summary': sqlData[i][6],
                        'articleLink': sqlData[i][7],
                    }
                    newsList.append(dict)
            respData = {'status':0, 'apiMessage':'success', 'newsList':newsList}
            response = make_response(jsonify(respData),200)
            return response
            
        except Exception as e:
            respData = {'status':0, 'apiMessage':'success', 'newsList':[]}
            response = make_response(jsonify(respData),200)
            return response
        
@apiMain.route('/app/getQuestions', methods=['POST'])
def getQuestions():
    if request.method =='POST':
        try:
            data = request.get_json()
            userId = data['userId']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM questionMaster WHERE askedBy=%s ORDER BY createdDate DESC"
            val = (userId, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            questionList = []
            if (len(sqlData) >0):
                for i in range(0, len(sqlData)):
                    dict = {
                        'questionId': sqlData[i][0],
                        'createdTime':sqlData[i][1].date().strftime('%d-%b-%Y'),
                        'question': sqlData[i][2],
                        'answer': sqlData[i][4]
                    }
                    questionList.append(dict)

            respData = {'statusCode':0, 'apiMessage':'success','questionList':questionList}
            response = make_response(jsonify(respData),200)
            return response
            
        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'failed to load','questionList':[]}
            response = make_response(jsonify(respData),200)
            return response
        
@apiMain.route('/app/askQuestion', methods=['POST'])
def askQuestion():
    if request.method == 'POST':
        try:
            data = request.get_json()
            question = data['question']
            userId = data['userId']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "INSERT INTO questionMaster (questionId, createdDate, question, askedBy) VALUES (%s, %s, %s, %s)"
            val = (str(uuid.uuid4()), datetime.datetime.now(), question, userId)
            cursor.execute(sql, val)
            connLocal.commit()

            respData = {'statusCode':0, 'apiMessage':'Question posted to our experts. Expect a response soon!'}
            response = make_response(jsonify(respData),200)
            return response
            
        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'Failed to ask due to a technical error. Please try again in sometime.'}
            response = make_response(jsonify(respData),200)
            return response
        
@apiMain.route('/app/getEvents', methods=['POST'])
def getEvents():
    if request.method == 'POST':
        try:
            data = request.get_json()
            city = data['city']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            dateToday = datetime.datetime.today()

            sql = "SELECT * FROM eventMaster WHERE (city=%s) AND (eventDate>%s) ORDER BY eventDate ASC"
            val = (city, dateToday)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            eventList = []
            message = "found"
            if(len(sqlData)>0):
                for i in range(0, len(sqlData)):
                    dict = {
                        'eventId': sqlData[i][0],
                        'eventDate': sqlData[i][2].date().strftime('%d-%b-%Y'),
                        'eventTime': sqlData[i][3].time().strftime("%I:%M %p"),
                        'eventName': sqlData[i][4],
                        'eventAddress': sqlData[i][5],
                        'info': sqlData[i][6],
                        'imageLink': sqlData[i][7],
                        'pincode': sqlData[i][8],
                        'city': sqlData[i][9],
                        'state': sqlData[i][10],
                        'websiteLink': sqlData[i][11],
                        'registrationLink': sqlData[i][12]
                    }
                    eventList.append(dict)
            else:
                message= "No events in " + str(city) + ". Please check other cities."

            sql = "SELECT * FROM eventMaster WHERE (city!=%s) AND (eventDate>%s) ORDER BY eventDate ASC"
            val = (city, dateToday)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            for i in range(0, len(sqlData)):
                dict = {
                    'eventId': sqlData[i][0],
                    'eventDate': sqlData[i][2].date().strftime('%d-%b-%Y'),
                    'eventTime': sqlData[i][3].time().strftime("%I:%M %p"),
                    'eventName': sqlData[i][4],
                    'eventAddress': sqlData[i][5],
                    'info': sqlData[i][6],
                    'imageLink': sqlData[i][7],
                    'pincode': sqlData[i][8],
                    'city': sqlData[i][9],
                    'state': sqlData[i][10],
                    'websiteLink': sqlData[i][11],
                    'registrationLink': sqlData[i][12]
                }
                eventList.append(dict)
                
            respData = {'statusCode':0, 'apiMessage':message,'eventList':eventList}
            response = make_response(jsonify(respData),200)

            print("Response: ", response)
            return response
        
        except Exception as e:
            respData = {'statusCode':2, 'apiMessage':'No events for now, please check later','eventList':[]}
            response = make_response(jsonify(respData),200)
            print("Error: ", e)
            return response
        
@apiMain.route('/app/getCityList', methods = ['POST'])
def getCityList():
    if request.method == 'POST':
        try:
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM cityList ORDER BY city ASC"
            cursor.execute(sql)
            sqlData = cursor.fetchall()
            cityList = []
            for i in range(0, len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'city': sqlData[i][1]
                }
                cityList.append(dict)
            
            respData = {'statusCode':0, 'apiMessage':'success', 'cityList':cityList}
            response = make_response(jsonify(respData),200)
            return response

        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'failed to load', 'cityList':["Oops, cannot load cities, please try again after sometime."]}
            response = make_response(jsonify(respData),200)
            return response
            
        