from flask import Flask, render_template, redirect, request, url_for, flash, session, Blueprint, current_app, jsonify, json, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import datetime
import logging
import pymssql
from itsdangerous import URLSafeTimedSerializer
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import re
import base64
from Cryptodome.Cipher import AES
import socket
import random
import string

def userSessionGenerator(length):
    # With combination of lower and upper case
    result_str = ''.join(random.choice(string.ascii_letters) for i in range(length))
    return result_str



auth = Blueprint('auth',__name__)
logging.basicConfig(filename='misDashboardLog.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')




@auth.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return response

@auth.route('/signup', methods = ['GET', 'POST'])
def signup():
    if request.method=='POST':
        email = request.form.get('email')
        name = request.form.get('name')
        salt = request.form.get('salt')
        password = request.form.get('password')
        passwordHashed = generate_password_hash(password, method='sha256')
        salt = request.form.get('salt')
        print("Name: ", current_app.config.get('SERVER_LOCAL'))
        
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))

        if salt == current_app.config.get('SECRET_KEY'):
            cursor = connLocal.cursor()
            sql = "SELECT * FROM dbo.userAuth WHERE EMAIL=%s"
            val = (email, )
            cursor.execute(sql, val)
            user = cursor.fetchall()
            if user:
                cursor.close()
                message = "User already exists, please sign up with a new email id!"
                return render_template('signup.html',message=message)
            else:
                id = str(uuid.uuid4())
                timestamp = datetime.datetime.now()
                sql = "INSERT INTO dbo.userAuth (id, name, email, password, signupDate) VALUES (%(id)s,%(name)s, %(email)s, %(password)s, %(signupDate)s)"
                val = {'id':id,'name':name,'email':email,'password':passwordHashed,'signupDate':timestamp}
                cursor.execute(sql, val)
                connLocal.commit()
                cursor.close()
                connLocal.close()
                message = "You've Successfully created your Account!"
                return render_template('login.html',message=message)
        else:
            message = "Incorrect salt. You are not allowed to sign up for this. Please wait, tracing your location for capture..."
            return render_template('signup.html',salterror=message)
    else:
        return render_template('signup.html')


@auth.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = True if request.form.get('remember') else False

        # connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM dbo.userAuth WHERE email=%s"
        val = (email, )
        cursor.execute(sql, val)
        user = cursor.fetchall()
        counter = 0
        if not user:
            cursor.close()
            #connLocal.close()
            return render_template('login.html',message="Invalid Username or Password! Please try again.")  
        elif not check_password_hash(user[0][3], password):
            return render_template('login.html',message="YOu have entered an incorrect password")
       
        else:
            print("I am here")
            session.permanent = True
            session['loginTime'] = datetime.datetime.now()
            # session['id'] = user[0][0]
            session['username'] = user[0][1]
            session['email'] = user[0][2]
            session['userVerification'] = userSessionGenerator(16)
            timestamp = datetime.datetime.now()
            sql = "UPDATE userAuth SET lastLogin=%s WHERE email = %s"
            val = (timestamp ,email)
            cursor.execute(sql, val)
            connLocal.commit()
            return redirect(url_for('main.index'))
             
    else:
        return render_template('login.html')

@auth.route('/logout')
def logout():
    logIncomingIP()
    connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=dbLocal(), database=current_app.config.get('DB_LOCAL'))
    cursor = connLocal.cursor()
    
    isLoggedIn = 0
    email = session['email']
    sql = "UPDATE dbo.userAuth SET isLoggedIn = %s WHERE email = %s"
    val = ( isLoggedIn ,email)
    cursor.execute(sql, val)
    connLocal.commit()

    session.pop('loginTime',None)
    session.pop('username', None)
    session.pop('email', None)
    session.pop('userType', None)
    session.pop('currency',None)
    session.pop('usdToINR',None)
    session.pop('aedToINR',None)
    session.pop('userVerification',None)
    session.pop('csrf_token',None)
    session.pop('_permanent',None)
 
    return redirect(url_for('auth.login'))

def funcsendpasswordresetlink(user_email):
    resetkey = URLSafeTimedSerializer("random")

    password_reset_url = url_for('auth.password_reset_url', token = resetkey.dumps(user_email, salt="password_reset_string"), _external=True)
    

    fromaddr = 'paymatemis@paymate.co.in'
    toaddrs  = user_email
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "PayMate MIS Password Reset Link"
    msg['From'] = fromaddr
    msg['To'] = toaddrs
    html = render_template('email_password_reset.html', password_reset_url=password_reset_url)
    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(html, 'html')
    msg.attach(part1)
    username = current_app.config.get('GMAIL_USERNAME')
    password = current_app.config.get('GMAIL_PASSWORD')
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo()
    server.starttls()
    server.login(username,password)
    server.sendmail(fromaddr, toaddrs, msg.as_string())
    server.quit()

@auth.route('/forgotPassword', methods=['GET','POST'])
def forgotPassword():
    if request.method == 'POST':
        logIncomingIP()
        email = request.form.get('email')
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=dbLocal(), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM dbo.userAuth WHERE email=%(email)s"
        val = {'email':email}
        cursor.execute(sql, val)
        data = cursor.fetchall()
        if not data:
            flash("Invalid username or Password! Please try again")
        else:
            sql = "SELECT * FROM dbo.resetEmailValidator WHERE email=%s"
            val = (email,)
            cursor.execute(sql, val)
            data = cursor.fetchall()
            if not data:
                sql = "INSERT INTO dbo.resetEmailValidator (attempts, requestedOn,email) VALUES(%s,%s,%s)"
                val = (1,datetime.datetime.now(), email)
                cursor.execute(sql, val)
                connLocal.commit()
                cursor.close()
                funcsendpasswordresetlink(email)
                flash("Password reset link is emailed to you(Please also check your SPAM FOLDER). The link will expire in 1 hour.")
            else: 
                if data[0][2].date() == datetime.datetime.now().date() and data[0][1] < 3:
                    sql = "UPDATE dbo.resetEmailValidator SET attempts=%s,requestedOn=%s WHERE email = %s"
                    val = (data[0][1]+1,datetime.datetime.now(), email)
                    cursor.execute(sql, val)
                    connLocal.commit()
                    cursor.close()
                    funcsendpasswordresetlink(email)
                    flash("Password reset link is emailed to you(Please also check your SPAM FOLDER). The link will expire in 1 hour.")
                elif data[0][2].date() != datetime.datetime.now().date() :
                    sql = "UPDATE dbo.resetEmailValidator SET attempts=%s, requestedOn=%s WHERE email = %s"
                    val = (1,datetime.datetime.now(), email)
                    cursor.execute(sql, val)
                    connLocal.commit()
                    cursor.close()
                    funcsendpasswordresetlink(email)
                    flash("Password reset link is emailed to you(Please also check your SPAM FOLDER). The link will expire in 1 hour.")
                elif data[0][2].date() == datetime.datetime.now().date() and data[0][1] >= 3:
                    flash(" You've reached the limit kindly try again after 24 HRS") 

        return redirect(url_for('auth.forgotPassword'))
    
    else:
        return render_template('forgotpassword.html')

@auth.route('/password_reset_url/<token>', methods = ['GET', 'POST'])
def password_reset_url(token):
    if request.method=='POST':
        logIncomingIP()
        try:
            resetkey = URLSafeTimedSerializer("random")
            email = resetkey.loads(token, salt = "password_reset_string", max_age=3600)
        except:
            flash("The link is either expired or invlaid, please try again.")
            return redirect(url_for('auth.login'))
        password = request.form.get('password')
        r_pattern = re.compile('^(?=\S{8,20}$)(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^A-Za-z\s0-9])')
        result = re.search(r_pattern, password)
        if result:
            passwordHashed = generate_password_hash(password, method='sha256')
            salt = request.form.get('salt')
            userType = request.form.get('userType')
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=dbLocal(), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            sql = "UPDATE dbo.userAuth SET password=%(password)s, incorrectAttempts=0, blocked=0 WHERE email=%(email)s"
            # val = (passwordHashed, email)
            val = {'password':passwordHashed,'email':email}
            cursor.execute(sql, val)
            connLocal.commit()
            flash("Password Reset Successful")
            return redirect(url_for('auth.login'))
        else:
            flash("Password should contain at least one lowercase, uppercase, digit, special character and minumum length of 8")
            return redirect(url_for('auth.password_reset_url', token = token))
    else:
        try:
            resetkey = URLSafeTimedSerializer("random")
            email = resetkey.loads(token, salt = "password_reset_string", max_age=3600)
        except:
            flash("The link is either expired or invlaid, please try again.")
            return redirect(url_for('auth.login'))

        return render_template('resetpassword.html', token=token)

    return redirect(url_for('auth.login'))
