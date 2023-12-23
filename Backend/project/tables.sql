CREATE TABLE userAuth(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50),
    password VARCHAR(500),
    signupDate DATETIME,
    lastLogin DATETIME
)

CREATE TABLE userAuthApp(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(50),
    password VARCHAR(500),
    signupDate DATETIME,
    lastLogin DATETIME
)

CREATE TABLE appToken (
    token VARCHAR(500) PRIMARY KEY,
    email VARCHAR(50),
    creationTime DATETIME,
    expiryTime DATETIME
)

CREATE TABLE topicMaster (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(50),
    status VARCHAR(20) 
)