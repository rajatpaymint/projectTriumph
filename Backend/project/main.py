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
import boto3
import random
import openai
from bs4 import BeautifulSoup


main = Blueprint("main", __name__)


@main.route('/index', methods=["GET",'POST'])
def index():
    if request.method == 'GET':

        date2 = datetime.datetime.today()
        month = date2.month
        year = date2.year
        date2Display = (date2).strftime("%Y-%m-%d")
        date2 = (date2+timedelta(days=1)).strftime("%Y-%m-%d")
        date1 = str(year) + "-" + str(month) + "-01"

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM userAuthApp WHERE signupDate BETWEEN %s AND %s"
        val = (date1, date2)
        cursor.execute(sql,val)
        sqlData = cursor.fetchall()
        userData = sqlData

        return (render_template('index.html', date1=date1, date2=date2Display, userData=userData))
    else:
        return("Post Request")
    
@main.route('/addNews', methods=['GET','POST'])
def addNews():
    if request.method == 'GET':
        date2 = datetime.datetime.today()
        month = date2.month
        year = date2.year
        date2Display = (date2).strftime("%Y-%m-%d")
        date2 = (date2+timedelta(days=1)).strftime("%Y-%m-%d")
        date1 = str(year) + "-" + str(month) + "-01"

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM topicMaster WHERE status='active' ORDER BY topic ASC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        topicList = sqlData

        sql = "SELECT * FROM newsMain ORDER BY createdDate DESC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        newsList = sqlData

        return render_template('addNews.html', newsList=newsList, topicList=topicList)
    else:
        keywords = request.form.get('keywords')
        # imageLink = request.form.get('imageLink')
        imageFile = request.files['imageFile']
        headline = request.form.get('headline')
        summary = request.form.get('summary')
        articleLink = request.form.get('articleLink')
        location = request.form.get('location')
        topicId = request.form.get('topic')
        createdDate = datetime.datetime.today()
        newsId = str(uuid.uuid4())

        s3 = boto3.client('s3')
        bucket_name = 'z2papppublicbucket'
        folder_name = 'folder1'
        filename = str(random.randint(10000,99999)) + str(datetime.datetime.today())
        filename = filename.replace(':','-')
        filename = filename.replace('.','-')
        filename = filename.replace(' ','-')
        s3_file_key = f'{folder_name}/{filename}'
        s3.upload_fileobj(imageFile, bucket_name, s3_file_key, ExtraArgs={'ACL': 'public-read'})
        imageLink = f'https://{bucket_name}.s3.ap-south-1.amazonaws.com/{s3_file_key}'

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "INSERT INTO newsMain (id, createdDate, createdBy, keywords, imageLink, headline, summary, articleLink, location, topic) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (newsId, createdDate, "Rajat", keywords, imageLink, headline, summary, articleLink, location, topicId)
        cursor.execute(sql, val)
        connLocal.commit()

        return redirect(url_for("main.addNews"))
    
@main.route('/gptNewsLearn', methods=['POST'])
def gptNewsLearn():
    if request.method == 'POST':
        try:
            print("I am inside gpt response")
    
            openai.api_key = "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"
            data = request.get_json()
            prompt = data['prompt']
            print ("Prompt: ", prompt)
            # client = OpenAI()

            response = openai.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {
                    "role": "system",
                    "content": "YOu will be provided with a material copy-pasted from a news article website. So it may contain some random text as well. YOur job is to filter it and sumarise the news in under 200 words."
                    },
                    {
                    "role": "user",
                    "content": "Give me 3 key statistical facts about main subjet of the following news article: In FY23, PayMate, a B2B payments firm preparing for an IPO, marginally reduced its net loss to INR 55.7 Cr from INR 57.7 Cr in FY22. Operating revenue grew 11.7% to INR 1,350.1 Cr, driven by a shift from paper-based to digital workflows. The company saw a substantial 84.53% increase in customer adoption, expanding its base to over 390,000, with growth in CEMEA and APAC regions. PayMate's total payment volume rose 21% to INR 84,519 Cr. Total revenue reached INR 1,351.6 Cr, despite an 11% rise in expenses. The company is reconsidering its IPO plans, initially postponed due to market volatility."
                    }
                ],
                temperature=0.8,
                max_tokens=400,
                top_p=1
                )
            print ((response.choices[0].message.content))
            return("Succcess")
            
        except Exception as e:
            print("Error: ", e)
            return("Failed")

@main.route('/addArticle', methods = ['GET','POST'])
def addArticle():
    if request.method == 'GET':
        date2 = datetime.datetime.today()
        month = date2.month
        year = date2.year
        date2Display = (date2).strftime("%Y-%m-%d")
        date2 = (date2+timedelta(days=1)).strftime("%Y-%m-%d")
        date1 = str(year) + "-" + str(month) + "-01"

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM newsletterMain ORDER BY modifiedDate DESC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        articleList = sqlData


        return render_template('addArticle.html', articleList=articleList)
    else:
        headline = request.form.get('headline')
        imageFile = request.files['imageFile']
        articleFile = request.files['articleFile']
        isPremium = request.form.get('isPremium')
        createdDate = datetime.datetime.today()
        modifiedDate = createdDate
        publishDate = createdDate
        createdBy = "Rajat"
        articleId = str(uuid.uuid4())

        s3 = boto3.client('s3')
        bucket_name = 'z2pappstorage1'
        folder_name = 'newsletterMain'

        articleFileName = str(random.randint(10000,99999)) + str(datetime.datetime.today()) + "article"
        articleFileName = articleFileName.replace(':','-')
        articleFileName = articleFileName.replace('.','-')
        articleFileName = articleFileName.replace(' ','-')
        articleFileName = articleFileName + ".html"

        articleFileKey = f'{folder_name}/{articleFileName}'
        s3.upload_fileobj(articleFile, bucket_name, articleFileKey)
        articleLink = folder_name + "/" + articleFileName

        bucket_name = 'z2papppublicbucket'
        folder_name = 'folder1'

        imageFileName = str(random.randint(10000,99999)) + str(datetime.datetime.today()) + "image"
        imageFileName = imageFileName.replace(':','-')
        imageFileName = imageFileName.replace('.','-')
        imageFileName = imageFileName.replace(' ','-')

        imageFileKey = f'{folder_name}/{imageFileName}'
        s3.upload_fileobj(imageFile, bucket_name, imageFileKey, ExtraArgs={'ACL': 'public-read'})
        imageLink = f'https://{bucket_name}.s3.ap-south-1.amazonaws.com/{imageFileKey}'

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "INSERT INTO newsletterMain (id, headline, createdDate, modifiedDate, publishDate, createdBy, imageLink, fileLink, isPremium) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val =(articleId, headline, createdDate, modifiedDate, publishDate, "Rajat", imageLink, articleLink, isPremium)
        cursor.execute(sql, val)
        connLocal.commit()
        
        return redirect(url_for("main.addArticle"))
    
@main.route('/askExpert', methods=['GET','POST'])
def askExpert():
    if request.method == 'GET':
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM questionMaster ORDER BY createdDate DESC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        questionData = sqlData
        return render_template('askExpert.html', questionData=questionData)
    else:
        return redirect(url_for('main.askExpert'))
    
@main.route('/saveAnswer', methods=['POST'])
def saveAnswer():
    if request.method == 'POST':
        try:
            print("I am in request")
            data = request.get_json()
            questionId = data['questionId']
            answer = data['answer']
            print("Data: ", questionId, answer)

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "UPDATE questionMaster SET answer=%s, answeredBy=%s, answeredTime=%s WHERE questionId=%s"
            val = (str(answer), "Rajat", datetime.datetime.today(),str(questionId))
            cursor.execute(sql,val)
            connLocal.commit()
            print("Updated Successfully")
            responseData = {'message':"Success"}
            response = make_response(jsonify(responseData),200)
            return (response)
        except Exception as e:
            responseData = {'message':e}
            response = make_response(jsonify(responseData),200)
            return (response)
        
@main.route('/addEvent', methods=['GET','POST'])
def addEvent():
    if request.method == 'GET':
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM eventMaster ORDER BY eventDate DESC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        eventList = sqlData

        return render_template('addEvent.html', eventList=eventList)
    else:
        eventId = str(uuid.uuid4())
        createdDate = datetime.datetime.today()
        eventDate = request.form.get('eventDate') 
        eventTime = request.form.get('eventTime') 
        eventName = request.form.get('eventName')
        eventAddress = request.form.get('eventAddress')
        eventInfo = request.form.get('eventInfo')
        imageFile = request.files['imageFile']
        pincode = request.form.get('pincode')
        city = request.form.get('city')
        state = request.form.get('state')
        websiteLink = request.form.get('websiteLink')
        registrationLink = request.form.get('registrationLink')

        s3 = boto3.client('s3')
        bucket_name = 'z2papppublicbucket'
        folder_name = 'eventImages'

        imageFileName = str(random.randint(10000,99999)) + str(datetime.datetime.today()) + "image"
        imageFileName = imageFileName.replace(':','-')
        imageFileName = imageFileName.replace('.','-')
        imageFileName = imageFileName.replace(' ','-')

        imageFileKey = f'{folder_name}/{imageFileName}'
        s3.upload_fileobj(imageFile, bucket_name, imageFileKey, ExtraArgs={'ACL': 'public-read'})
        imageLink = f'https://{bucket_name}.s3.ap-south-1.amazonaws.com/{imageFileKey}'

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "INSERT INTO eventMaster (eventId, createdDate, eventDate, eventTime, eventName, eventAddress, info, imageLink, pincode, city, state, websiteLink, registrationLink) VALUES (%s, %s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s, %s)"
        val = (eventId, createdDate, eventDate, eventTime, eventName, eventAddress, eventInfo, imageLink, pincode, city, state, websiteLink, registrationLink)
        cursor.execute(sql, val)
        connLocal.commit()

        print("Event Date: ", eventDate)
        print("Event Time: ", eventTime)
        
        return redirect(url_for('main.addEvent'))