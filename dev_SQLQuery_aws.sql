--------------Start of userAuthApp--------------------
CREATE TABLE userAuthApp(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50),
    mobileNumber VARCHAR(15),
    city VARCHAR(100),
    password VARCHAR(500),
    signupDate DATETIME,
    lastLogin DATETIME,
    profilePhoto VARCHAR(2000)
)
SELECT * FROM userAuthApp


--------------End of userAuthApp--------------------

--------------Start of appTokenMaster--------------------
CREATE TABLE appTokenMaster (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId VARCHAR(100),
    createdAt DATETIME,
    expiresAt DATETIME,
    status VARCHAR(50),
    tokenType VARCHAR(100),
    token VARCHAR(100)
)

SELECT * FROM appTokenMaster
UPDATE appTokenMaster SET status='inactive' WHERE id=35

--------------End of appTokenMaster--------------------

CREATE TABLE userAuth (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50),
    password VARCHAR(500),
    signupDate DATETIME,
    lastlogin DATETIME
)
SELECT * FROM userAuth
DELETE FROM userAuth WHERE name='Rajat'

SELECT * FROM userAuthApp

DELETE FROM userAuthApp

CREATE TABLE appToken (
    token VARCHAR(500) PRIMARY KEY,
    email VARCHAR(50),
    creationTime DATETIME,
    expiryTime DATETIME
)


CREATE TABLE userTopicMaster (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId VARCHAR(500),
    email VARCHAR(100),
    topicId INT,
    topic VARCHAR(50)
)
--------------NewsLetter--------------------

CREATE TABLE newsletterMain (
    id VARCHAR(255) PRIMARY KEY,
    headline VARCHAR(4000),
    createdDate DATETIME,
    modifiedDate DATETIME,
    publishDate DATETIME,
    createdBy VARCHAR(255),
    imageLink VARCHAR(2000),
    fileLink VARCHAR(2000),
    isPremium VARCHAR(10),
    description VARCHAR(3000)
)

SELECT * FROM newsletterMain
https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/116432024-01-30-01-33-56-147739

UPDATE newsletterMain SET description='Swiggy, one of the stalwart of the Indian startup ecosystem is facing tough challenges towards its road to IPO. Should it cut costs to inch towards profitability or continue on its growth path accumulating losses?' WHERE isPremium='yes'
UPDATE newsletterMain SET isPremium='no' WHERE id='2717aac6-1a20-431c-9eb5-683fe376cbea'



INSERT INTO newsletterMain VALUES ('7','Byjus going down under, reports state by Feb end 7', CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,'Rajat','https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/byjusSample.png','newsletterMain/sampleArticle.html','no')
UPDATE newsletterMain set imageLink='https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/byjusSample.png' WHERE ID='3'
-------------END of Newsletter---------------

-------------NewsMain---------------

CREATE TABLE newsMain (
    id VARCHAR(255) PRIMARY KEY,
    createdDate DATETIME,
    createdBy VARCHAR(255),
    keywords VARCHAR(1500),
    imageLink VARCHAR(3000),
    headline VARCHAR(2000),
    summary VARCHAR(3000),
    articleLink VARCHAR(3000),
    location VARCHAR(500),
    topic VARCHAR(255)
)

CREATE TABLE newsLearn (
    id INT PRIMARY KEY IDENTITY(1,1),
    newsId VARCHAR(255),
    learnMore VARCHAR(4000),
    addedDate DATETIME
)
Regional, AI, Finance, Health, Education, Ecomm, Green Energy, EV, Biotech, Food, IoT, Blockchain, PropTech, Legal, Media, Gaming, Robotics, Animation, AR/VR, Agritech, Fashion, Travel, Social Impact, Space, Supply Chain & Logistics, Wellness, HR, Cybersecurity, Event, Pet, DeepTech, Drone, Social Media   

SELECT * FROM newsMain ORDER BY createdDate DESC
SELECT * FROM newsLearn ORDER BY addedDate DESC


INSERT INTO newsMain (id, createdDate, createdBy, keywords, imageLink, headline, summary, articleLink) VALUES ('16', CURRENT_TIMESTAMP, 'Rajat Yadav', 'byjus,valuation,education,edtech', 'https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/sample2.png', 'Byjus to file for bankruptcy soon: Reports 16', 'This is for learning purpose and you have to take this seriously, because if you do, harm may come, which could very well be fatal. So please man, just chill the f out. This is for learning purpose and you have to take this seriously, because if you do, harm may come, which could very well be fatal. So please man, just chill the f out. This is for learning purpose and you have to take this seriously, This is for learning purpose and you have to take this seriously, because if you do, harm may come.', 'https://www.moneycontrol.com/news/technology/upgrad-owned-knowledgehuts-ceo-subramanyam-reddy-resigns-former-byjus-executive-asheesh-sharma-takes-helm-11988711.html');

-------------END of NewsMain---------------

-------------Start of NewsLearn---------------
CREATE TABLE 
-------------End of NewsLearn---------------

-------------Start of topicMaster---------------
CREATE TABLE topicMaster(
    id INT PRIMARY KEY,
    topic VARCHAR(200),
    status VARCHAR(50),
    iconLink VARCHAR(2000)
)
DROP TABLE topicMaster
SELECT * FROM topicMaster
-------------End of topicMaster---------------

-------------Start of questionMaster---------------

CREATE TABLE questionMaster(
    questionId VARCHAR(500),
    createdDate DATETIME,
    question VARCHAR(5000),
    askedBy VARCHAR(500),
    answer VARCHAR(5000),
    answeredBy VARCHAR(500),
    answeredTime DATETIME
)

SELECT * FROM questionMaster


INSERT INTO questionMaster (questionId,createdDate,question,askedBy,answer,answeredBy,answeredTime) VALUES ('2',CURRENT_TIMESTAMP,'Is it okay if I am just a single cofounder?', '9c752fbd-a2b6-4ab0-975e-22a780dfe40d','','','')
UPDATE questionMaster SET answer='This is my answer to your question. I am making sure that this answer is big enough to see how it will look on the scree. Hopefully not bad!',answeredBy='Rajat',answeredTime=CURRENT_TIMESTAMP WHERE questionId='49c50595-5226-4b88-a005-41712235b071'

-------------End of questionMaster---------------

-------------Start of eventMaster---------------
CREATE TABLE eventMaster (
    eventId VARCHAR(500),
    createdDate DATETIME,
    eventDate DATETIME,
    eventTime DATETIME,
    eventName VARCHAR(500),
    eventAddress VARCHAR(1000),
    info VARCHAR(3000),
    imageLink VARCHAR(2000),
    pincode VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(100),
    websiteLink VARCHAR(2000),
    registrationLink VARCHAR(2000)
)
INSERT INTO eventMaster VALUES ('6', CURRENT_TIMESTAMP, '2025-09-01T00:00:00', CONVERT(TIME, GETDATE()), 'Investor Connect 2k27','E 109/14, Shivaji Nagar, Near Nutan College, Bhopal(MP)-462016','A fun filled event for founders to connect and pitch with investors from across India and the world. Some notable investors include - Lightbox, Tiger Global, 100x','https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/byjusSample.png','462016','Bangalore','Madhya Pradesh','https://www.100x.vc/','https://www.tigerglobal.com/' )
SELECT * FROM eventMaster ORDER BY eventDate DESC
UPDATE eventMaster SET eventDate='2025-09-01T00:00:00' WHERE eventID='3'

-------------End of eventMaster---------------

-------------Start of cityMaster---------------
CREATE TABLE cityList(
    id VARCHAR(50) PRIMARY KEY,
    city VARCHAR(100)
)

SELECT * FROM cityList


-------------End of cityMaster---------------

-------------Start of investorDirectory---------------
CREATE TABLE investorDirectory (
    id VARCHAR(400) PRIMARY KEY,
    createdDate DATETIME, 
    name VARCHAR(150),
    sectors VARCHAR(500),
    stage VARCHAR(100),
    email VARCHAR(150),
    phone VARCHAR(50),
    website VARCHAR(2000),
    linkedIn VARCHAR(2000),
    city VARCHAR(100),
    country VARCHAR(100)
)

SELECT * FROM investorDirectory ORDER BY name ASC



-------------End of investorDirectory---------------

-------------Start of incubatorDirector---------------

CREATE TABLE incubatorDirectory (
    id VARCHAR(400) PRIMARY KEY,
    createdDate DATETIME, 
    name VARCHAR(150),
    about VARCHAR(2000),
    email VARCHAR(150),
    phone VARCHAR(50),
    website VARCHAR(2000),
    linkedIn VARCHAR(2000),
    city VARCHAR(100),
    country VARCHAR(100)
)

SELECT * FROM incubatorDirectory ORDER BY name ASC

-------------End of incubatorDirector---------------

-------------Start of startupDatabase---------------
CREATE TABLE startupDatabaseMaster (
    id VARCHAR(300) PRIMARY KEY, 
    name VARCHAR(400),
    companyName VARCHAR(500),
    keywords VARCHAR(1000),
    about VARCHAR(1000),
    foundedYear DATETIME,
    founders VARCHAR(1000),
    city VARCHAR(100),
    valuation INT,
    valuationDate DATETIME,
    lastFunding INT,
    lastFundingDate DATETIME,
    totalFunding INT,
    investors VARCHAR(2000),
    employeeCount INT,
    employeeCountDate DATETIME,
    annualRev INT,
    annualRevYear DATETIME,
    annualProfit INT,
    annualProfitYear DATETIME,
    website VARCHAR(1000),
    imageLink VARCHAR(1000),
    openToHiring VARCHAR(10),
    hiringLink VARCHAR(1000),
    lastStatus VARCHAr(50)
)

SELECT * FROM startupDatabaseMaster

INSERT INTO startupDatabaseMaster VALUES ('1','Zomato',"Zomato Pvt Ltd.","Technology, Food Delivery, Food Aggregator", "India's first food delivery app", "2012-09-01T00:00:00","Deepinder Goyal, Rajat Rathi","Mumbai",2000,CURRENT_TIMESTAMP,20,CURRENT_TIMESTAMP,180,"Blackrock, TigerGlobal, Sachin Bansal, SoftBank, Vijay Shekhar Sharma",450,CURRENT_TIMESTAMP,200,"2023-09-01T00:00:00",1,"2025-09-01T00:00:00","https://www.zomato.com/","https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/zomato.png",)
-------------End of startupDatabase---------------

-------------Start of subscriptionMaster---------------
CREATE TABLE subscriptionMaster (
    id VARCHAR(300) PRIMARY KEY,
    userId VARCHAR(300),
    subscriptionId VARCHAR(300),
    name VARCHAR(100),
    subscribedDate DATETIME,
    endDate DATETIME,
    price FLOAT,
    currency VARCHAR(20),
    status VARCHAR(100),
    paymentMasterId VARCHAR(50),
    lastUpdated DATETIME
)


SELECT * FROM subscriptionMaster
INSERT INTO subscriptionMaster (id, userId, subscriptionId, name, subscribedDate, endDate, price, currency, status) VALUES ('abc', 'cec40c21-8328-4268-b2bc-d195df075eef', '0', 'free','2024-02-07', '2030-02-07', 0, 'INR', 'active')
-------------End of subscriptionMaster---------------

-------------Start of subscriptionList---------------
CREATE TABLE subscriptionList(
    id VARCHAR(300) PRIMARY KEY,
    name VARCHAR(100),
    amount FLOAT,
    subscriptionId VARCHAR(10),
    description VARCHAR(300),
    createdDate DATETIME,
    status VARCHAR(50)
)

SELECT * FROM subscriptionList
UPDATE subscriptionList SET amount=699 WHERE id='abc3'
INSERT INTO subscriptionList (id, name, amount, subscriptionId, description, createdDate, status) VALUES ('abc3', 'Premium Plan - 1 year', 599, '3', 'Full access to premium articles and resources',CURRENT_TIMESTAMP, 'active')
-------------End of subscriptionList---------------


-------------Start of paymentMaster---------------
CREATE TABLE paymentMaster(
id VARCHAR(300) PRIMARY KEY,
userId VARCHAR(300),
orderId VARCHAR(200),
orderAmount FLOAT,
systemCreatedDate DATETIME,
pgCreatedDate DATETIME,
lastUpdatedDate DATETIME,
subscriptionId VARCHAR(50),
note1 VARCHAR(200),
orderStatus VARCHAR(100), 
pgOrderId VARCHAR(200),
pgPaymentId VARCHAR(200),
pgSignature VARCHAR(500),
signatureVerified VARCHAR(10),
pgStatus VARCHAR(50),
)

SELECT * FROM paymentMaster

-------------End of paymentMaster---------------

-------------Start of marketReportMaster---------------
CREATE TABLE marketReportMaster(
    id INT PRIMARY KEY IDENTITY(1,1),
    userId VARCHAR(200),
    createdTime DATETIME,
    industry VARCHAR(200),
    marketType VARCHAR(50)
)

SELECT * FROM marketReportMaster ORDER BY createdTime DESC
-------------End of marketReportMaster---------------

-------------Start of resourceMaster---------------
CREATE TABLE resourceMaster (
    id INT PRIMARY KEY IDENTITY(1,1),
    createdDate DATETIME,
    folder VARCHAR(200),
    name VARCHAR(1000),
    fileLink VARCHAR(2000),
    published VARCHAR(10),
    description VARCHAR(2000)
)

SELECT * FROM resourceMaster

UPDATE resourceMaster SET description = 'General presentation template that can be used for making any business ppt or even a pitch deck' WHERE id=7

DELETE FROM resourceMaster
-------------End of resourceMaster---------------

-------------Start of resourceFolder---------------
CREATE TABLE resourceFolder (
    id INT PRIMARY KEY IDENTITY(1,1),
    folderName VARCHAR(200),
    createdDate DATETIME
)

SELECT * FROM resourceFolder

INSERT INTO resourceFolder (folderName, createdDate) VALUES ('MIS', CURRENT_TIMESTAMP)
UPDATE resourceFolder SET folderName='PPT' WHERE id=2
-------------End of resourceFolder---------------


SELECT * FROM appToken
SELECT * FROM userAuthApp

SELECT * FROM userTopicMaster
SELECT * FROM newsMaster

DELETE FROM userTopicMaster WHERE topicId=5

UPDATE appToken SET userId='113f49a6-2adf-4811-af9e-e7b471ff3f07' WHERE email='legacy2711@gmail.com'

INSERT INTO topicMaster (topic, status) VALUES ('War', 'active')

ALTER TABLE appToken
ADD userId varchar(500);

INSERT INTO userTopicMaster (userId, email, topicId, topic) VALUES('9e5ac34e-cd21-4f14-919f-4d7055e40fa9','yadavrajat800@gmail.com',5,'Indian Politics')