
from flask import (
    Flask,
    app,
    render_template,
    redirect,
    request,
    url_for,
    Blueprint,
    current_app,
    jsonify,
    make_response,
)
import pymssql
import datetime
from datetime import date, timedelta, timezone
import uuid
import uuid
from fiscalyear import *
import boto3
from botocore.client import Config
import random
import openai
import httpx
from httpx import Timeout
import asyncio
import traceback
import requests
import threading
import pathlib
import textwrap
import google.generativeai as genai
import IPython
from IPython.display import display
from IPython.display import Markdown
import markdown

main = Blueprint("main", __name__)


def make_async_request(url, json_payload):
    """Function to send request in a separate thread."""
    def request_thread():
        requests.post(url, json=json_payload)
    
    thread = threading.Thread(target=request_thread)
    thread.start()

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

        url = current_app.config.get('URL')
        apiUrl = url + '/gptNewsLearn'
        json_payload = {'newsId': newsId}
        
        # Make the request in a separate thread
        make_async_request(apiUrl, json_payload)
        
        return redirect(url_for("main.addNews"))
    
@main.route('/geminiTest', methods=['POST'])
def geminiTest():
    if request.method == 'POST':
        try:
            def to_markdown(text):
                text = text.replace('•', '  *')
                return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
            print('1')
            genai.configure(api_key=current_app.config.get('GEMINI_KEY'))
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    print(m.name)
            model = genai.GenerativeModel('gemini-pro')
            response = model.generate_content("Give me some financial info about the Indian company PayMate")
            html = markdown.markdown(response.text)
            print(html)
            return(html)
        
        except Exception as e:
            print("Error: ", e)

@main.route('/gptNewsLearn', methods=['POST'])
async def gptNewsLearn():
    if request.method == 'POST':
        try:
            print("I am inside gpt response")

            data = request.get_json()
            newsId = data['newsId']
            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()
            
            sql = "SELECT * FROM newsMain WHERE id=%s"
            val = (newsId, )
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()
            newsSummary = sqlData[0][6]
            prompt = "Ggive me some good statistical and conceptual educative content for entreprenuers about the subject matter of the following news in under 500 words: " + str(newsSummary)
            print("Prompt: ", prompt)
            timeout = Timeout(60.0)
            # Replace the OpenAI API call with an async HTTPX call
            # AIzaSyC0fylPcv1EufknkpmPxycy0GPZXFw9YsE
            async with httpx.AsyncClient(timeout=timeout) as client:
                response = await client.post(
                    'https://api.openai.com/v1/chat/completions',
                    headers={
                        "Authorization": f"Bearer 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",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": "gpt-4-turbo-preview",
                        "messages": [
                            {
                                "role": "system",
                                "content": "You are embedded in an education platform and will be given a news summary as input. Your job is to provide more educative learnings and context about the subject material of that news."
                            },
                            {
                                "role": "user",
                                "content": prompt
                            }
                        ],
                        "temperature": 0.8,
                        "max_tokens": 400,
                        "top_p": 1
                    },
                )
                # Process the response
                response_data = response.json()
                print("Response _______________________: ",response_data)
            # genai.configure(api_key="AIzaSyC0fylPcv1EufknkpmPxycy0GPZXFw9YsE")
            # for m in genai.list_models():
            #     if 'generateContent' in m.supported_generation_methods:
            #         print(m.name)
            # model = genai.GenerativeModel('gemini-pro')
            # response = model.generate_content(prompt)
            # print(response.text)
            sql = "SELECT * FROM newsLearn WHERE newsId=%s"
            val = (newsId, )
            cursor.execute(sql,val)
            sqlData = cursor.fetchall()
            if sqlData:
                sql = 'UPDATE newsLearn SET learnMore=%s, addedDate=%s WHERE newsId=%s'
                val =(response_data['choices'][0]['message']['content'], datetime.datetime.now(), newsId)
                # val =(response.text, datetime.datetime.now(), newsId)
                cursor.execute(sql, val)
                connLocal.commit()
            else:
                sql = "INSERT INTO newsLearn (newsId, learnMore, addedDate) VALUES (%s, %s, %s)"
                val = (newsId, response_data['choices'][0]['message']['content'], datetime.datetime.now())
                # val = (newsId, response.text, datetime.datetime.now())
                cursor.execute(sql, val)
                connLocal.commit()
            
            cursor.close()
            connLocal.close()

            respData = {'statusCode':'200', 'apiMessage':'success'}
            response = make_response(jsonify(respData),200)
            return response
            
        except Exception as e:
            traceback.print_exc()  # This prints the traceback of the exception to stderr
            print(f"Error: {str(e)}")  # Printing the string representation of the exception
            return jsonify({"error": "Failed", "details": str(e)}), 500

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
    
@main.route('/addInvestor', methods=['GET','POST'])
def addInvestor():
    if request.method == 'GET':
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM investorDirectory ORDER BY name ASC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        investorList = sqlData
        return render_template('addInvestor.html', investorList=investorList)
    else:
        id = str(uuid.uuid4())
        createdDate = datetime.datetime.today()
        name = request.form.get('name')
        sectors = request.form.get('sectors')
        stage = request.form.get('stage')
        email = request.form.get('email')
        phone = request.form.get('phone')
        website = request.form.get('website')
        linkedIn = request.form.get('linkedIn')
        city = request.form.get('city')
        country = request.form.get('country')

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "INSERT INTO investorDirectory (id, createdDate, name, sectors, stage, email, phone, website, linkedIn, city, country) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (id, createdDate, name, sectors, stage, email, phone, website, linkedIn, city, country)
        cursor.execute(sql, val)
        connLocal.commit()

        return redirect(url_for('main.addInvestor'))

@main.route('/addIncubator', methods=['GET','POST'])
def addIncubator():
    if request.method == 'GET':
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM incubatorDirectory ORDER BY createdDate DESC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        incubatorList = sqlData

        return render_template('addIncubator.html', incubatorList=incubatorList)
    else:
        id = str(uuid.uuid4())
        createdDate = datetime.datetime.today()
        name = request.form.get('name')
        about = request.form.get('about')
        email = request.form.get('email')
        phone = request.form.get('phone')
        website = request.form.get('website')
        linkedIn = request.form.get('linkedIn')
        city = request.form.get('city')
        country = request.form.get('country')

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "INSERT INTO incubatorDirectory (id, createdDate, name, about, email, phone, website, linkedIn, city, country) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (id, createdDate, name, about, email, phone, website, linkedIn, city, country)
        cursor.execute(sql, val)
        connLocal.commit()

        return redirect(url_for('main.addIncubator'))
    
@main.route('/testDownload', methods=['POST'])
def testDownload():
    if request.method=='POST':
        data = request.get_json()
        filename = data['filename']

        s3 = boto3.client('s3',region_name='ap-south-1', config=Config(signature_version='s3v4'))
        bucket_name = 'z2pappstorage1'
        object_key = filename

        presigned_url = s3.generate_presigned_url('get_object', Params={'Bucket': bucket_name, 'Key': filename}, ExpiresIn=3600)  # URL expires in 1 hour
        return jsonify({'url': presigned_url})
    
@main.route('/subscriptionManager', methods=['GET','POST'])
def subscriptionManager():
    if request.method == 'GET':
        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "SELECT * FROM subscriptionMaster ORDER BY subscribedDate DESC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        subscriptionData = sqlData

        sql = "SELECT * FROM subscriptionList WHERE status=%s and subscriptionId NOT IN (%s)"
        val = ('active', '0')
        cursor.execute(sql,val)
        sqlData = cursor.fetchall()
        subscriptionList = sqlData
        
        connLocal.close()
        cursor.close()


        return render_template('subscriptionManager.html', subscriptionData=subscriptionData, subscriptionList=subscriptionList)
    else:
        id = str(uuid.uuid4())
        userId = request.form.get('userId')
        subscriptionId = str(request.form.get('subscriptionId'))
        print('Subscription Id: ', subscriptionId)

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()
        sql = "SELECT * FROM subscriptionList WHERE status=%s and subscriptionId=%s"
        val = ('active', subscriptionId)
        cursor.execute(sql,val)
        sqlData = cursor.fetchall()

        name = sqlData[0][1]
        price = sqlData[0][2]
        subscribedDate = request.form.get('subscribedDate')
        endDate = request.form.get('endDate')
        print("Dates: ", subscribedDate, endDate)
        currency = "INR"
        paymentMasterId = request.form.get('paymentMasterId')
        dateToday = datetime.datetime.now()
        lastUpdate = dateToday

        sql = "SELECT * FROM subscriptionMaster WHERE userId=%s and subscriptionId=%s and status=%s"
        val = (userId, '0', 'active')
        cursor.execute(sql,val)
        sqlData = cursor.fetchall()

        if sqlData:
            sql = "UPDATE subscriptionMaster SET status=%s, lastUpdated=%s WHERE userId=%s and subscriptionId=%s and status=%s"
            val = ('inactive', datetime.datetime.now(), userId, '0', 'active')
            cursor.execute(sql,val)
            connLocal.commit()

            sql = "INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status, paymentMasterId, lastUpdated) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, 'active', paymentMasterId, datetime.datetime.now())
            cursor.execute(sql,val)
            connLocal.commit()
            
        else:
            print("No free plan detected")
            

        connLocal.close()
        cursor.close()
        return redirect(url_for('main.subscriptionManager'))

@main.route('/makeSubscriptionInactive', methods = ['POST'])
def makeSubscriptionInactive():
    if request.method == 'POST':
        try:
            print("I am in makeSubscriptionInactive")
            data = request.get_json()
            id = data['id']
            userId = data['userId']

            connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
            cursor = connLocal.cursor()

            sql = "SELECT * FROM subscriptionMaster WHERE id=%s and status=%s"
            val = (id, 'active')
            cursor.execute(sql, val)
            sqlData = cursor.fetchall()

            if sqlData:
                dateToday = datetime.datetime.now()
                sql = "UPDATE subscriptionMaster SET status=%s, lastUpdated=%s WHERE id=%s"
                val = ('inactive', dateToday, id)
                cursor.execute(sql, val)
                connLocal.commit()

                
                endDate = dateToday + timedelta(days = 7300)
                sql = "INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status, lastUpdated) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                val = (str(uuid.uuid4()), userId, str(0), 'free', dateToday, endDate, 0, 'INR', 'active', dateToday)
                cursor.execute(sql, val)
                connLocal.commit()

                responseData = {'message':"Success"}
                response = make_response(jsonify(responseData),200)
                return (response)
            
            else:
                responseData = {'message':"Failure. You did not select an active plan!"}
                response = make_response(jsonify(responseData),200)
                return (response)

        except Exception as e:
            print(e)
            responseData = {'message': e}
            response = make_response(jsonify(responseData),200)
            return (response)

@main.route('/addResource', methods = ['GET','POST'])
def addResource():
    if request.method == 'GET':

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = 'SELECT * FROM resourceMaster ORDER BY createdDate DESC'
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        resourceList = sqlData

        sql = "SELECT * FROM resourceFolder ORDER BY createdDate DESC"
        cursor.execute(sql)
        sqlData = cursor.fetchall()
        folderList = sqlData

        cursor.close()
        connLocal.close()

        return render_template('addResource.html', resourceList=resourceList, folderList=folderList)
    
    else:

        name = request.form.get('name')
        resourceFile = request.files['resourceFile']
        folder = request.form.get('folder')
        fileExt = request.form.get('fileExt')
        description = request.form.get('description')

        s3 = boto3.client('s3')
        bucket_name = 'z2pappstorage1'
        folder_name = "Resources/" + folder
        print("Folder name: ", folder)

        resourceFileName = str(random.randint(10000,99999)) + str(datetime.datetime.today()) + "resource"
        resourceFileName = resourceFileName.replace(':','-')
        resourceFileName = resourceFileName.replace('.','-')
        resourceFileName = resourceFileName.replace(' ','-')
        resourceFileName = resourceFileName + "." + fileExt

        resourceFileKey = f'{folder_name}/{resourceFileName}'
        s3.upload_fileobj(resourceFile, bucket_name, resourceFileKey)
        resourceLink = folder_name + "/" + resourceFileName

        connLocal = pymssql.connect(server=current_app.config.get('SERVER_LOCAL'), port=current_app.config.get('PORT_LOCAL'), user=current_app.config.get('USER_LOCAL'), password=current_app.config.get('PASSWORD_LOCAL'), database=current_app.config.get('DB_LOCAL'))
        cursor = connLocal.cursor()

        sql = "INSERT INTO resourceMaster (createdDate, folder, name, fileLink, published, description) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (datetime.datetime.today(), folder, name, resourceLink, 'yes', description)
        cursor.execute(sql, val)
        connLocal.commit()

        cursor.close()
        connLocal.close()

        return redirect(url_for('main.addResource'))