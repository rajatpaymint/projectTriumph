CREATE TABLE userAuthApp(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50),
    mobileNumber VARCHAR(15),
    city VARCHAR(100),
    password VARCHAR(500),
    signupDate DATETIME,
    lastLogin DATETIME
)
SELECT * FROM userAuthApp


SELECT * FROM userAuth

SELECT * FROM userAuthApp

DELETE FROM userAuthApp

CREATE TABLE appToken (
    token VARCHAR(500) PRIMARY KEY,
    email VARCHAR(50),
    creationTime DATETIME,
    expiryTime DATETIME
)

CREATE TABLE topicMaster (
    id INT PRIMARY KEY IDENTITY(1,1),
    topic VARCHAR(50),
    status VARCHAR(20) 
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
    isPremium VARCHAR(10)
)

SELECT * FROM newsletterMain


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
    id VARCHAR(255) PRIMARY KEY,
    learnMore VARCHAR(4000),
    addedDate DATETIME

)
Regional, AI, Finance, Health, Education, Ecomm, Green Energy, EV, Biotech, Food, IoT, Blockchain, PropTech, Legal, Media, Gaming, Robotics, Animation, AR/VR, Agritech, Fashion, Travel, Social Impact, Space, Supply Chain & Logistics, Wellness, HR, Cybersecurity, Event, Pet, DeepTech, Drone, Social Media   

SELECT * FROM newsMain ORDER BY createdDate DESC


INSERT INTO newsMain (id, createdDate, createdBy, keywords, imageLink, headline, summary, articleLink) VALUES ('16', CURRENT_TIMESTAMP, 'Rajat Yadav', 'byjus,valuation,education,edtech', 'https://z2papppublicbucket.s3.ap-south-1.amazonaws.com/folder1/sample2.png', 'Byjus to file for bankruptcy soon: Reports 16', 'This is for learning purpose and you have to take this seriously, because if you do, harm may come, which could very well be fatal. So please man, just chill the f out. This is for learning purpose and you have to take this seriously, because if you do, harm may come, which could very well be fatal. So please man, just chill the f out. This is for learning purpose and you have to take this seriously, This is for learning purpose and you have to take this seriously, because if you do, harm may come.', 'https://www.moneycontrol.com/news/technology/upgrad-owned-knowledgehuts-ceo-subramanyam-reddy-resigns-former-byjus-executive-asheesh-sharma-takes-helm-11988711.html');

-------------END of NewsMain---------------

-------------Start of topicMaster---------------
CREATE TABLE topicMaster(
    id INT PRIMARY KEY IDENTITY(1,1),
    topic VARCHAR(200),
    status VARCHAR(50),
    iconLink VARCHAR(2000)
)

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