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
    current_app,
    jsonify,
    json,
    make_response,
    send_file,
    send_from_directory,
    Response,
    abort
)
import pymssql
import datetime
from datetime import date, timedelta, timezone
import uuid
import uuid
from fiscalyear import *
import os
from werkzeug.security import generate_password_hash, check_password_hash
import boto3
import razorpay
import random
import string
import requests
import google.generativeai as genai
import IPython
from IPython.display import display
from IPython.display import Markdown
import markdown
import textwrap
# from app import bcrypt
from extensions import bcrypt
import logging
from flask_mail import Message
from itsdangerous import URLSafeTimedSerializer


# AKIAU6GD2L4PU4QJEBNU
# dgLZ4Ah8WCBAyuEUBOxUj8RfmcIBbFtjLi4r4Gtz

apiMain = Blueprint('apiMain', __name__)
logging.basicConfig(filename='misDashboardLog.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

@apiMain.before_request
def check_api_key():
    # Check if the 'X-API-Key' header is present and correct
    apiKey = request.headers.get('X-API-Key')
    if apiKey != current_app.config.get('MY_API_KEY'):
        # If the API key is missing or incorrect, reject the request
        abort(401, description="Invalid or missing API Key.")

@apiMain.route('/app/test', methods=['POST'])
def test():
    if request.method == 'POST':
        try:
            api_key = current_app.config.get('MY_API_KEY')
            print("___API____: ", api_key)
            apiKeyHeader = request.headers.get('X-API-Key')
            return jsonify({"APIKEY from config": api_key, "APIKey from header":apiKeyHeader}), 200
        except Exception as e:
            return ("Error: ", e)


@apiMain.route('/app/signup', methods=['POST'])
def appSignup():
    if request.method=='POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        # passwordHashed = generate_password_hash(password, method='sha256')
        passwordHashed = bcrypt.generate_password_hash(password).decode('utf-8')
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
                endDate = signupDate + timedelta(days=7300)
                sql = "INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                val = (str(uuid.uuid4()),id, str(0), 'free', signupDate, endDate, 0, 'INR', 'active')
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

        if not sqlData:
            respData = {'statusCode':1, 'apiMessage':"No user found with this email. Please signup first."}
            resp = make_response(jsonify(respData),200)
            return resp
        elif not bcrypt.check_password_hash(sqlData[0][5], password):
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
            
            sql = "SELECT * FROM appTokenMaster WHERE userId=%s and tokenType=%s"
            val = (userId, 'login')
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            print("I am here")

            if sqlData:
                sql = "DELETE FROM appTokenMaster WHERE userId=%s and tokenType=%s"
                val = (userId, 'login')
                cursor.execute(sql, val)
                connLocal.commit()
            
            token = str(uuid.uuid4())
            tokenCreationTime = datetime.datetime.now()
            tokenExpiryTime = tokenCreationTime + timedelta(days=1)

            sql = "INSERT INTO appTokenMaster (userId, createdAt, expiresAt, status, tokenType, token) VALUES (%s,%s,%s,%s,%s,%s)"
            val = (userId, tokenCreationTime, tokenExpiryTime, 'active', 'login', token)
            cursor.execute(sql, val)
            connLocal.commit()

            # url = current_app.config.get('URL')
            # headers = {
            #                 'X-API-Key': current_app.config.get('MY_API_KEY'),
            #                 'Content-Type': 'application/json'  # Often needed depending on the API
            #             }
            # response = requests.post(url+'/app/getUserSubscription', json={'userId':userId}, headers=headers)
            response = getUserSubscriptionFunction(userId)
            subscriptionId = response['userSubscriptionDetails'][0]['subscriptionId']

            cursor.close()
            connLocal.close()
            respData = {'statusCode':0, 'apiMessage':'login successful', 'token':token, 'tokenExpiryTime':tokenExpiryTime, 'userId':userId, 'name':name, 'mobile':mobile, 'city':city, 'subscriptionId':subscriptionId}
            resp = make_response(jsonify(respData), 200)
            return resp

@apiMain.route('/app/forgotPassword', methods=['POST'])
def forgotPassword():
    if request.method == 'POST':
        try:
            data = request.get_json()
            email = data['email']
            print("Email: ", email)

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM userAuthApp WHERE email=%s"
            val = (email, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()

            if not sqlData:
                respData = {'statusCode':1, 'apiMessage':'No user with this email id. Please signup.'}
                response = make_response(jsonify(respData), 200)
                cursor.close()
                connLocal.close()
                return response
            else:
                respData = {'statusCode':0, 'apiMessage':'Password reset link (valid for 60mins) is sent to your registered email. Kindly check your inbox and spam folder.'}
                response = make_response(jsonify(respData), 200)
                print("I am here 1")
                sendPasswordResetLink(email)
                cursor.close()
                connLocal.close()
                return response

        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'Failed to reset password at this time, please try again letter.'}
            response = make_response(jsonify(respData), 200)
            print('Error: ', e)

def sendPasswordResetLink(user_email):
    try:
        print("In sendPasswordResetLink1")
        resetkey = URLSafeTimedSerializer("random")
        print("Here6")
        password_reset_url = url_for('apiMain.password_reset_url_app', token = resetkey.dumps(user_email, salt="password_reset_string"), _external=True)
        print("Here4")
        msg = Message(
        "B2Z Password Reset Link",
        sender=current_app.config['MAIL_USERNAME'],
        recipients=[user_email],
        body="Please click on the following link and reset your B2Z app password: "+password_reset_url,
        )
        print("Here5")
        try:
            print("Here2")
            mail = current_app.extensions['mail']
            mail.send(msg)
            print("Here3")
            return jsonify({"message": "Email sent successfully!"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    except Exception as e:
        print("Error: ", e)

@apiMain.route('/password_reset_url_app/<token>', methods = ['GET', 'POST'])
def password_reset_url_app(token):
    if request.method == 'POST':
        try:
            print("here1")
            resetkey = URLSafeTimedSerializer("random")
            email = resetkey.loads(token, salt = "password_reset_string", max_age=3600)
        except:
            flash("The link is either expired or invlaid, please try again.")
        password = request.form.get('password')
        passwordHashed = bcrypt.generate_password_hash(password).decode('utf-8')
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "UPDATE userAuthApp SET password=%s WHERE email=%s"
        val =(passwordHashed, email)
        cursor.execute(sql, val)
        connLocal.commit()
        return("Password reset successful")

    else:
        try:
            resetkey = URLSafeTimedSerializer("random")
            email = resetkey.loads(token, salt = "password_reset_string", max_age=3600)
        except:
            flash("The link is either expired or invlaid, please try again.")
            return ("This reset link is expired! Please send a new link from the app.")

        return render_template('resetPassword.html', token=token)



@apiMain.route('/app/GoogleSignin', methods = ['POST'])
def GoogleSignin():
    if request.method == 'POST':
        try:
            print("I am here in app/googlesingin")
            data = request.get_json()
            email = data['email']
            name = data['name']
            profilePhoto = data['profilePhoto']
            print("Data: ", email, name, profilePhoto)

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            sql = "SELECT * FROM userAuthApp WHERE email=%s"
            val = (email, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            userData = sqlData

            if userData:
                userId = userData[0][0]
                timeNow = datetime.datetime.now()
                sql = "UPDATE userAuthApp SET lastLogin=%s WHERE email=%s"
                val = (timeNow, email)
                cursor.execute(sql,val)
                connLocal.commit()

                sql = "SELECT * FROM appTokenMaster WHERE userId=%s and tokenType=%s"
                val = (userId, 'login')
                cursor.execute(sql, val)
                sqlData = cursor.fetchall()
                print("I am here1")

                if sqlData:
                    print("I am here2")
                    sql = "DELETE FROM appTokenMaster WHERE userId=%s and tokenType=%s"
                    val = (userId, 'login')
                    cursor.execute(sql, val)
                    connLocal.commit()
                
                print("I am here3")
                token = str(uuid.uuid4())
                tokenCreationTime = datetime.datetime.now()
                tokenExpiryTime = tokenCreationTime + timedelta(days=1)

                sql = "INSERT INTO appTokenMaster (userId, createdAt, expiresAt, status, tokenType, token) VALUES (%s,%s,%s,%s,%s,%s)"
                val = (userId, tokenCreationTime, tokenExpiryTime, 'active', 'login', token)
                cursor.execute(sql, val)
                connLocal.commit()
                print("I am here4")

                try: 
                    logging.info("I am in the api within route")
                    # url = current_app.config.get('URL')
                    # headers = {
                    #             'X-API-Key': current_app.config.get('MY_API_KEY'),
                    #             'Content-Type': 'application/json'  # Often needed depending on the API
                    #         }
                    # response = requests.post(url+'/app/getUserSubscription', json={'userId':userId}, headers=headers)
                    response = getUserSubscriptionFunction(userId)
                    print("Response is _____: ", response)
                    print("Response: ", response['userSubscriptionDetails'])
                except Exception as e:
                    logging.info("Error logic: ", e)
                subscriptionId = response['userSubscriptionDetails'][0]['subscriptionId']
                print("I am here5")
                print("Subscription Id1: ", subscriptionId)

                cursor.close()
                connLocal.close()
                respData = {'statusCode':0, 'apiMessage':'login successful', 'token':token, 'tokenExpiryTime':tokenExpiryTime, 'userId':userId, 'name':name, 'mobile':'', 'city':'Bangalore', 'subscriptionId':subscriptionId}
                resp = make_response(jsonify(respData), 200)
                return resp
            
            elif not userData:
                try:
                    userId = str(uuid.uuid4())
                    signupDate = datetime.datetime.now()
                    sql = "INSERT INTO userAuthApp (id,name,email,city,signupDate, lastLogin, profilePhoto) VALUES (%s, %s, %s, %s, %s,%s, %s)"
                    val = (userId, name, email, 'Bangalore', signupDate, signupDate,profilePhoto)
                    cursor.execute(sql,val)
                    connLocal.commit()
                    endDate = signupDate + timedelta(days=7300)
                    sql = "INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                    val = (str(uuid.uuid4()),userId, str(0), 'free', signupDate, endDate, 0, 'INR', 'active')
                    cursor.execute(sql,val)
                    connLocal.commit()
                    
                    token = str(uuid.uuid4())
                    tokenCreationTime = datetime.datetime.now()
                    tokenExpiryTime = tokenCreationTime + timedelta(days=1)

                    sql = "INSERT INTO appTokenMaster (userId, createdAt, expiresAt, status, tokenType, token) VALUES (%s,%s,%s,%s,%s,%s)"
                    val = (userId, tokenCreationTime, tokenExpiryTime, 'active', 'login', token)
                    cursor.execute(sql, val)
                    connLocal.commit()

                    cursor.close()
                    connLocal.close()
                    respData = {'statusCode':0, 'apiMessage':'User registered successfully!', 'token':token, 'tokenExpiryTime':tokenExpiryTime, 'userId':userId, 'name':name, 'mobile':'', 'city':'Bangalore', 'subscriptionId':str(0)}
                    # data = {'statusCode':"200", 'apiMessage':'User registered successfully!'}
                    resp = make_response(jsonify(respData),200)
                    return resp
                
                except Exception as e:
                    respData = {'statusCode':1, 'apiMessage':'Error in registration, please try again!', 'error':e}
                    resp = make_response(jsonify(respData),200)
                    return resp

        except Exception as e:
            print("Error: ", e)
            respData = {'statusCode':1, 'apiMessage':'Error in registration, please try again!', 'error':e}
            resp = make_response(jsonify(respData),200)
            return resp
    

@apiMain.route('/app/checkToken', methods=['POST'])
def appCheckToken():
    if request.method=='POST':
        try:
            print("In app/checkToken")
            print(os.environ.get('AWS_ACCESS_KEY_ID'))
            print(os.environ.get('AWS_SECRET_ACCESS_KEY'))
            data = request.get_json()
            # key = request.headers.get('API_KEY')
            userId = data['userId']
            token = data['token']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM appTokenMaster WHERE userId=%s AND token=%s and status=%s"
            val = (userId, token, 'active')
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            print("In app/checkToken1: ", sqlData)
            if sqlData:
                tokenExpiryTime = sqlData[0][3]
                timeNow = datetime.datetime.now()
                if timeNow < tokenExpiryTime:
                    print("In app/checkToken2")
                    sql = "SELECT * FROM userAuthApp WHERE id=%s"
                    val = (userId, )
                    cursor.execute(sql, val)
                    sqlData = cursor.fetchall()
                    email = sqlData[0][2]
                    city = sqlData[0][4]
                    name = sqlData[0][1]
                    print("In app/checkToken3: ", sqlData)

                    # url = current_app.config.get('URL')
                    # headers = {
                    #         'X-API-Key': current_app.config.get('MY_API_KEY'),
                    #         'Content-Type': 'application/json'  # Often needed depending on the API
                    #     }
                    # response = requests.post(url+'/app/getUserSubscription', json={'userId':userId}, headers=headers)
                    response = getUserSubscriptionFunction(userId)
                    subscriptionId = response['userSubscriptionDetails'][0]['subscriptionId']
                    print("In app/checkToken4: ", subscriptionId)

                    respData = {'apiMessage': 'valid', 'token':token, 'tokenExpiryTime':tokenExpiryTime, 'email':email, 'city':city, 'name':name, 'subscriptionId':subscriptionId}
                else:
                    respData = {'apiMessage':'invalid', 'token':token}
            else:
                respData = {'apiMessage':'invalid', 'token':token}

            resp = make_response(jsonify(respData), 200)
            return resp
        except Exception as e:
            print("Error in ap/checkToken: ", e)

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

@apiMain.route('/app/saveProfilePhone', methods=['POST'])
def saveProfilePhone():
    if request.method =='POST':
        try:
            data = request.get_json()
            userId = data['userId']
            phone = data['phone'] 
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "UPDATE userAuthApp SET mobileNumber=%s WHERE id=%s"
            val =(phone, userId)
            cursor.execute(sql, val)
            connLocal.commit()

            respData = {'apiMessage':'success'}
            response = make_response(jsonify(respData),200)
            return response

        except Exception as e:
            print("Flask Error: ", e )
            respData = {'apiMessage':'failure'}
            response = make_response(jsonify(respData),200)
            return response

@apiMain.route('/app/saveProfileCity', methods=['POST'])
def saveProfileCity():
    if request.method =='POST':
        try:
            data = request.get_json()
            userId = data['userId']
            city = data['city'] 
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "UPDATE userAuthApp SET city=%s WHERE id=%s"
            val =(city, userId)
            cursor.execute(sql, val)
            connLocal.commit()

            respData = {'apiMessage':'success'}
            response = make_response(jsonify(respData),200)
            return response

        except Exception as e:
            print("Flask Error: ", e )
            respData = {'apiMessage':'failure'}
            response = make_response(jsonify(respData),200)
            return response

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
                    'isPremium': sqlData[i][8],
                    'description': sqlData[i][9]
                }
                newsletterList.append(dict)
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
            logging.info("I am in getSingle Article")
            print("I am into the request getSinglearticle")
            data = request.get_json()
            id = data['id']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            print("ID: ", id)
            
            sql = "SELECT headline,publishDate,createdBy,imageLink,fileLink,description FROM newsletterMain WHERE id=%s"
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
            description = sqlData[0][5]
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
                print("Error1__________________________: ", e)
                logging.info("I am in getSingle Article: ", e)

            # with open('sampleArticle.html', 'r',encoding='utf-8') as file:
            #     htmlContent = file.read()
            
            responseData = {'statusCode':0, 'content':htmlContent, 'headline':headline, 'publishDate':publishDate,'createdBy':createdBy,'imageLink':imageLink,'description':description}
            response = make_response(jsonify(responseData),200)
            return response
        
        except Exception as e:
            print("Error2__________________________: ", e)
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
        
@apiMain.route('/app/getNewsLearn', methods=['POST'])
def getNewsLearn():
    if request.method == 'POST':
        try:
            data = request.get_json()
            newsId = data['newsId']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM newsLearn WHERE newsId = %s"
            val = (newsId, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            if sqlData:
                newsLearnContent = sqlData[0][2]
                respData = {'status':'200', 'apiMessage':'success', 'newsLearnContent':newsLearnContent}
            else:
                respData = {'status':'200', 'apiMessage':'success', 'newsLearnContent': "Nothing new to learn for this news."}
                
            response = make_response(jsonify(respData),200)
            return response
        
        except Exception as e:
            print("Error: ", e)
            respData = {'status':'100', 'apiMessage':'failure', 'newsLearnContent': "Failed to load, please try again later."}
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
            print("In getQuestions")
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
            print("Question List: ", questionList)
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
            
@apiMain.route('/app/getInvestorDirectory', methods = ['POST'])
def getInvestorDirectory():
    if request.method == 'POST':
        try:
            data = request.get_json()
            pageLength = data['pageLength']
            currentPage = data['currentPage']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM investorDirectory ORDER BY name ASC OFFSET %s ROWS FETCH NEXT %s ROWS ONLY"
            val = ((currentPage-1)*pageLength,pageLength)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            investorList = []
            if len(sqlData)>0:
                for i in range(0, len(sqlData)):
                    dict = {
                        'id': sqlData[i][0],
                        'createdDate': sqlData[i][1],
                        'name': sqlData[i][2],
                        'sectors': sqlData[i][3],
                        'stage': sqlData[i][4],
                        'email': sqlData[i][5],
                        'phone': sqlData[i][6],
                        'website': sqlData[i][7],
                        'linkedIn': sqlData[i][8],
                        'city': sqlData[i][9],
                        'country': sqlData[i][10]
                    }
                    print("Dict: ", dict)
                    investorList.append(dict)
            print("Investor List: ", investorList)
            respData = {'statusCode':0, 'apiMessage':'success','investorList':investorList}
            response = make_response(jsonify(respData),200)
            return response
        
        except Exception as e:
            respData = {'statusCode':1, 'apiMessage':'failed to load','investorList':[]}
            response = make_response(jsonify(respData),200)
            print("Error: ", e)
            return response

@apiMain.route('/app/getIncubators', methods = ['POST'])
def getIncubators():
    if request.method == 'POST':
        try:
            data = request.get_json()
            pageLength = data['pageLength']
            currentPage = data['currentPage']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM incubatorDirectory ORDER BY name ASC OFFSET %s ROWS FETCH NEXT %s ROWS ONLY"
            val = ((currentPage-1)*pageLength,pageLength)
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            incubatorList = []
            if (len(sqlData)>0):
                for i in range(0, len(sqlData)):
                    dict = {
                        'id': sqlData[i][0],
                        'createdDate': sqlData[i][1],
                        'name': sqlData[i][2],
                        'about': sqlData[i][3],
                        'email': sqlData[i][4],
                        'phone': sqlData[i][5],
                        'website': sqlData[i][6],
                        'linkedIn': sqlData[i][7],
                        'city': sqlData[i][8],
                        'country': sqlData[i][9],
                    }
                    incubatorList.append(dict)
            
            respData = {'statusCode':0, 'apiMessage':'success', 'incubatorList':incubatorList}
            response = make_response(jsonify(respData),200)
            return response

        except Exception as e:
            print(e)
            respData = {'statusCode':1, 'apiMessage':'failed to load', 'incubatorList':[]}
            response = make_response(jsonify(respData),200)
            return response

@apiMain.route('/app/createOrder', methods = ['POST'])
def createOrder():
    if request.method == 'POST':
        try:
            print("I am createOrder flask")
            client = razorpay.Client(auth=("rzp_test_yvntbzHNeYGl6O", "7SVzKoOAGnCXBfVvXkkwBxUO"))
            data = request.get_json()
            amount = int(data['amount'])
            subscriptionId = str(data['subscriptionId'])
            userId = data['userId']
            currency = "INR"
            random_string = ''.join(random.choices(string.ascii_letters, k=15))
            receipt = random_string
            notes = {'note1': subscriptionId}  
            dateToday = datetime.datetime.today()
            order =  client.order.create({
                "amount": amount,
                "currency": currency,
                "receipt": receipt,
                "notes": notes
                })
            print("Order: ", order)
            orderId = order['id']
            pgCreatedDate = datetime.datetime.fromtimestamp(order['created_at'])
            orderStatus = order["status"]
            note1 = subscriptionId

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "INSERT INTO paymentMaster (id, userId, orderId, orderAmount, systemCreatedDate, pgCreatedDate, lastUpdatedDate, subscriptionId, note1, orderStatus) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (receipt, userId, orderId, amount, dateToday, pgCreatedDate, pgCreatedDate, subscriptionId, note1, orderStatus)
            cursor.execute(sql,val)
            connLocal.commit()

            return jsonify(order)
        
        except Exception as e:
            print (e)

@apiMain.route('/app/updatePayment', methods=['POST'])
def updatePayment():
    if request.method == 'POST':
        try:
            data = request.get_json()
            pgOrderId = data['pgOrderId']
            pgPaymentId = data['pgPaymentId']
            pgSignature = data['pgSignature']
            pgStatus = data['pgStatus']
            dateToday = datetime.datetime.now()

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "UPDATE paymentMaster SET lastUpdatedDate=%s, pgOrderId=%s, pgPaymentId=%s, pgSignature=%s, pgStatus=%s WHERE orderId=%s"
            val = (dateToday, pgOrderId, pgPaymentId, pgSignature, pgStatus, pgOrderId)
            cursor.execute(sql, val)
            connLocal.commit()

            sql = "SELECT * FROM paymentMaster WHERE orderId=%s AND pgPaymentId=%s"
            val = (pgOrderId, pgPaymentId)
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            
            paymentMasterId = sqlData[0][0]
            userId = sqlData[0][1]
            price = sqlData[0][3]
            subscribedDate = sqlData[0][4]
            subscriptionId = str(sqlData[0][7])
            currency = "INR"
            if subscriptionId == '1':
                name = 'monthly'
                endDate = subscribedDate + timedelta(days=30)
            elif subscriptionId == '2':
                name = "6months"
                endDate = subscribedDate + timedelta(days=183)
            elif subscriptionId == '3':
                name = "yearly"
                endDate = subscribedDate + timedelta(days=364)
            
            sql = "UPDATE subscriptionMaster SET status='inactive' WHERE userId=%s"
            val =(userId, )
            cursor.execute(sql, val)
            connLocal.commit()

            sql = "INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status, paymentMasterId) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (str(uuid.uuid4()), userId, subscriptionId, name, subscribedDate, endDate, price, currency, 'active', paymentMasterId)
            cursor.execute(sql, val)
            connLocal.commit()
            cursor.close()
            connLocal.close()

            respData = {'statusCode': '200', 'apiMessage':'success', 'subsriptionId':subscriptionId, 'userMessage': 'Thank you! Your payment is successful and your subscription will be updated shortly. If not, please create a ticket at support@z2papp.com'}
            response = make_response(jsonify(respData), 200)
            print("Python Response: ", response.data)
            return response

        except Exception as e:
            print(e)
            respData = {'statusCode': '0', 'apiMessage':'failed', 'subscriptionId':'0', 'userMessage': 'Uh oh, the payment gateway failed the transaction! Please try again. If your money is deducted, it will be refunded within 24 hours.'}
            response = make_response(jsonify(respData), 200)
            return response

@apiMain.route('/app/getUserSubscription', methods=['POST'])
def getUserSubscription():
    if request.method == 'POST':
        try:
            print("I am in app/getUserSubscription")
            data = request.get_json()
            userId = data['userId']
            print("Userid: ", userId)
            dateToday = datetime.datetime.now()
            userSubscriptionDetails = []
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
    
            sql = "SELECT * FROM subscriptionMaster WHERE userId = %s and status = 'active'"
            val = (userId,)
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            print("User subs: ", sqlData)
            print("sqlData[0][5]: ", sqlData[0][5])
                
            if ((sqlData[0][5]<dateToday)):
                print("Here 1")
                sql = "UPDATE subscriptionMaster SET status='inactive' WHERE userId = %s and id = %s"
                val = (userId, sqlData[0][0])
                cursor.execute(sql, val)
                connLocal.commit()
                endDate = dateToday + timedelta(days=7300)
                sql = "INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
                val = (str(uuid.uuid4()),userId,str(0), 'free', dateToday, endDate, 0, 'INR', 'active')
                cursor.execute(sql, val)
                connLocal.commit()
                dict = {
                    'subscriptionId': 0,
                    'subscribedDate': dateToday,
                    'endDate': endDate
                }
                userSubscriptionDetails.append(dict)
            else:
                print("Here 2")
                dict = {
                    'subscriptionId': sqlData[0][2],
                    'subscribedDate': sqlData[0][4],
                    'endDate': sqlData[0][5]
                }
                userSubscriptionDetails.append(dict)
            
            respData = {'statusCode':200, 'apiMessage':'success', 'userSubscriptionDetails':userSubscriptionDetails}
            print("RespData: ", respData)
            response = make_response(jsonify(respData),200)
            return response
        except Exception as e:
            print("Error: ", e)
            respData = {'statusCode':200, 'apiMessage':'failed to load', 'userSubscriptionDetails':[]}
            response = make_response(jsonify(respData),200)
            return response
        
def getUserSubscriptionFunction(userId):
    try:
        print("I am in /getUserSubscriptionFunction")
        print("Userid: ", userId)
        dateToday = datetime.datetime.now()
        userSubscriptionDetails = []
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM subscriptionMaster WHERE userId = %s and status = 'active'"
        val = (userId,)
        cursor.execute(sql,val)
        sqlData = cursor.fetchall()
        print("User subs: ", sqlData)
        print("sqlData[0][5]: ", sqlData[0][5])
            
        if ((sqlData[0][5]<dateToday)):
            print("Here 1")
            sql = "UPDATE subscriptionMaster SET status='inactive' WHERE userId = %s and id = %s"
            val = (userId, sqlData[0][0])
            cursor.execute(sql, val)
            connLocal.commit()
            endDate = dateToday + timedelta(days=7300)
            sql = "INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (str(uuid.uuid4()),userId,str(0), 'free', dateToday, endDate, 0, 'INR', 'active')
            cursor.execute(sql, val)
            connLocal.commit()
            dict = {
                'subscriptionId': 0,
                'subscribedDate': dateToday,
                'endDate': endDate
            }
            userSubscriptionDetails.append(dict)
        else:
            print("Here 2")
            dict = {
                'subscriptionId': sqlData[0][2],
                'subscribedDate': sqlData[0][4],
                'endDate': sqlData[0][5]
            }
            userSubscriptionDetails.append(dict)
        
        respData = {'statusCode':200, 'apiMessage':'success', 'userSubscriptionDetails':userSubscriptionDetails}
        print("RespData: ", respData)
        response = make_response(jsonify(respData),200)
        print("Here 3")
        return respData
    except Exception as e:
        print("Error: ", e)
        respData = {'statusCode':200, 'apiMessage':'failed to load', 'userSubscriptionDetails':[]}
        response = make_response(jsonify(respData),200)
        return respData

@apiMain.route('/app/updateSubscription', methods=['POST'])
def updateSubscription():
    if request.method == 'POST':
        try:
            data = request.get_json()
            
            subscribedDate = data['subscribedDate']
            id = str(uuid.uuid4())
            userId = data['userId']
            subscriptionId = str(data['subscriptionId'])
            if subscriptionId == '1':
                name = 'monthly'
                endDate = subscribedDate + timedelta(days=30)
            elif subscriptionId == '2':
                name = "6months"
                endDate = subscribedDate + timedelta(days=183)
            elif subscriptionId == '3':
                name = "yearly"
                endDate = subscribedDate + timedelta(days=364)
            price = data['price']
            currency = "INR"
            status = "active"
            paymentMasterId = data['paymetMasterId']


            print('1')
        except Exception as e:
            print(e)

@apiMain.route('/app/getSubscriptionList', methods = ['POST'])
def getSubscriptionList():
    if request.method == 'POST':
        try:
            print("Entered getSubscriptionList flask")
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM subscriptionList WHERE status=%s ORDER BY amount ASC"
            val = ('active', )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            subscriptionList = []
            for i in range(1, len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'name': sqlData[i][1],
                    'amount': sqlData[i][2],
                    'subscriptionId': sqlData[i][3],
                    'description': sqlData[i][4],
                    'createdDate': sqlData[i][5]
                }
                subscriptionList.append(dict)
            
            respData = {'statusCode':200, 'apiMessage':'success','subscriptionList':subscriptionList}
            response = make_response(jsonify(respData),200)
            return response
        
        except Exception as e:
            print("Error: ", e)
            respData = {'statusCode':100, 'apiMessage':'failed to load','subscriptionList':[]}
            response = make_response(jsonify(respData),200)
            return response
        
@apiMain.route('/app/generateMarketReport', methods=['POST'])
def generateMarketReport():
    if request.method == 'POST':
        try:
            print("I am in generateMarketReport")
            data = request.get_json()
            marketType = data['marketType']
            industry = data['industry']
            subscriptionId = data['subscriptionId']
            userId = data['userId']
            dateToday = datetime.datetime.now()
            dateCheck = dateToday - timedelta(days=1)
            dateCheck2 = dateToday - timedelta(hours=1)

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            line1 = "For the " + marketType + " " + industry + " industry, give me market insights covering the following heads: "
            line2 = "1) Industry Overview: an overview of the industry and its current trends, 2) Industry Size: detailed analysis of the size of the industry, 3) Industry Growth rate: should include historical and projected growth rates, 4) Comparison: comparison of the Indian industry with the same in United States and China, 5) Key Players in the Industry:  5 key players in the industry, their business model, revenue, funding and valuation. 6) Market Entry Strategy: Based on your research, outline how to plan to enter the market. Consider pricing strategies, distribution channels, marketing tactics, and product differentiation, 7) Funding Trends: what are the recent funding(angel and venture capital) trends in this industry, 8) Key regulations in the industry. Note: Skip any formal texts in the beginning or end of response."
            genai.configure(api_key=current_app.config.get('GEMINI_KEY'))
            model = genai.GenerativeModel('gemini-pro')
            
            if subscriptionId == '0':
                sql = "SELECT * FROM marketReportMaster WHERE userId=%s and createdTime>%s"
                val = (userId, dateCheck)
                cursor.execute(sql,val)
                sqlData = cursor.fetchall()
                if (len(sqlData)>=2):
                    respData = {'apiMessage':'limitFree', 'data':""}
                    response = make_response(jsonify(respData), 200)
                    cursor.close()
                    connLocal.close()
                    return(response)
                else:
                    response = model.generate_content(line1 + line2)
                    responseText = response.text
                    print(responseText)

                    sql = "INSERT INTO marketReportMaster (userId, createdTime, industry, marketType) VALUES (%s, %s, %s, %s)"
                    val = (userId, datetime.datetime.today(), industry, marketType)
                    cursor.execute(sql, val)
                    connLocal.commit()

                    respData = {'apiMessage':'success', 'data':responseText}
                    response = make_response(jsonify(respData), 200)
                    cursor.close()
                    connLocal.close()
                    return(response)
                
            elif subscriptionId != '0':
                sql = "SELECT * FROM marketReportMaster WHERE userId=%s and createdTime>%s"
                val = (userId, dateCheck2)
                cursor.execute(sql,val)
                sqlData = cursor.fetchall()
                if (len(sqlData)>=3):
                    respData = {'apiMessage':'limitGeneral', 'data':""}
                    response = make_response(jsonify(respData), 200)
                    cursor.close()
                    connLocal.close()
                    return(response)
                else:
                    response = model.generate_content(line1 + line2)
                    responseText = response.text
                    print(responseText)

                    sql = "INSERT INTO marketReportMaster (userId, createdTime, industry, marketType) VALUES (%s, %s, %s, %s)"
                    val = (userId, datetime.datetime.today(), industry, marketType)
                    cursor.execute(sql, val)
                    connLocal.commit()

                    respData = {'apiMessage':'success', 'data':responseText}
                    response = make_response(jsonify(respData), 200)
                    cursor.close()
                    connLocal.close()
                    return(response)

        except Exception as e:
            print("Error: ", e)
            respData = {'apiMessage':'failure', 'data':"Can't generate report at this time due to excess server load, please try again later."}
            response = make_response(jsonify(respData), 200)
            return(response)

@apiMain.route('/app/getFolderList', methods = ['POST'])
def getFolderList():
    if request.method == 'POST':
        try:
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM resourceFolder ORDER BY createdDate ASC"
            cursor.execute(sql)
            sqlData = cursor.fetchall()
            folderList = []
            for i in range(0,len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'folder': sqlData[i][1]
                }
                folderList.append(dict)
            
            respData = {'apiMessage':'success', 'folderList':folderList}
            response = make_response(jsonify(respData),200)
            return response
        except Exception as e:
            print("Error: ", e)
            respData = {'apiMessage':'failure', 'folderList':[]}
            response = make_response(jsonify(respData),200)
            return response
        
@apiMain.route('/app/getResourceItems', methods=['POST'])
def getResourceItems():
    if request.method == 'POST':
        try:
            print("In get resource Items")
            data = request.get_json()
            folderId = data['id']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM resourceFolder WHERE id = %s"
            val = (folderId, )
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            folderName = str(sqlData[0][1])

            sql = "SELECT * FROM resourceMaster WHERE folder=%s AND published=%s ORDER BY createdDate DESC"
            val = (folderName,'yes')
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            fileList = []
            for i in range(0, len(sqlData)):
                dict = {
                    'id': sqlData[i][0],
                    'createdDate': sqlData[i][1],
                    'name': sqlData[i][3],
                    'fileLink': sqlData[i][4],
                    'description': sqlData[i][6]
                }
                fileList.append(dict)
            
            respData = {'apiMessage':'success','fileList':fileList}
            response = make_response(jsonify(respData),200)

            return response
        
        except Exception as e:
            print("Error: ", e)
            respData = {'apiMessage':'success','fileList':[]}
            response = make_response(jsonify(respData),200)

            return response
        
@apiMain.route('/app/getSingleFile', methods= ['POST'])
def getSingleFile():
    if request.method == 'POST':
        try:
            print('1')
            data = request.get_json()
            fileId = data['id']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM resourceMaster WHERE id=%s"
            val = (fileId, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()

            fileLink = sqlData[0][4]
            print("FileLink: ", fileLink)
            region_name = "ap-south-1"

            s3 = boto3.client('s3',region_name=region_name)
            bucket_name = 'z2pappstorage1'
            

            
            print("I am into the s3 equest")
            # file = s3.get_object(Bucket=bucket_name, Key=fileLink)
            pre_signed_url = s3.generate_presigned_url('get_object',
                                                Params={'Bucket': bucket_name,
                                                        'Key': fileLink},
                                                ExpiresIn=3600)
            respData = {'apiMessage':'success', 'url':pre_signed_url}
            response = make_response(jsonify(respData), 200)
            return response
        
        except Exception as e:
            print("Error: ", e)
            respData = {'apiMessage':'failure', 'url':""}
            response = make_response(jsonify(respData), 200)
            return response
        
@apiMain.route('/app/sendEmail', methods = ['POST'])
def sendEmail():
    if request.method == 'POST':
        msg = Message(
        "Hello from the Blueprint",
        sender=current_app.config['MAIL_USERNAME'],
        recipients=["yadavrajat800@gmail.com"],
        body="This is a test email sent from a Flask app using a blueprint!"
    )
    try:
        mail = current_app.extensions['mail']
        mail.send(msg)
        return jsonify({"message": "Email sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
     