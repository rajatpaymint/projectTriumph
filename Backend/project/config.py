class config(object):
    SESSION_COOKIE_SECURE = True
    SECRET_KEY = "1740fe41-ff19-481b-8479-45b475c0fe0a"
    SALT = b"\xba\x19\xeb\xbc4\x93\xf1`E\xd1\x96\xec\xdd\xce\xef~\xf4\xa0w`Y\xca\x8a\xeb\xceu\xb2\xddoUg\x16"


class configProd(config):
    SERVER_LOCAL = "prodexpress.cp4cmc08k900.ap-south-1.rds.amazonaws.com"
    USER_LOCAL = "admin"
    PORT_LOCAL = "1433"
    # PASSWORD_LOCAL= "Admin@123"
    PASSWORD_LOCAL="Legacy2711-"
    DB_LOCAL = "projectTriumphTest"
    URL = "https://b2z.world/"
    GEMINI_KEY = "AIzaSyC0fylPcv1EufknkpmPxycy0GPZXFw9YsE"
    OPENAI_APIKEY = "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"
    APP_DOWNLOAD_URL = "https://www.rajatyadav.info/"

    MAIL_SERVER = "smtpout.secureserver.net"
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = "awareness@b2z.club"
    MAIL_PASSWORD = "Legacy2711-"
    MY_API_KEY="your_api_key_here"


class configLocal(config):
    SERVER_LOCAL = "database-1.cp4cmc08k900.ap-south-1.rds.amazonaws.com"
    USER_LOCAL = "admin"
    PORT_LOCAL = "1433"
    # PASSWORD_LOCAL= "Admin@123"
    PASSWORD_LOCAL="Legacy2711-"
    DB_LOCAL = "projectTriumphTest"
    URL = "https://39f2-2401-4900-1ca3-7b94-89d0-b947-92f9-217a.ngrok-free.app/"
    # URL = "http://z2puat.in/"
    GEMINI_KEY = "AIzaSyC0fylPcv1EufknkpmPxycy0GPZXFw9YsE"
    OPENAI_APIKEY = "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"
    APP_DOWNLOAD_URL = "https://www.rajatyadav.info/"

    MAIL_SERVER = "smtpout.secureserver.net"
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = "awareness@b2z.club"
    MAIL_PASSWORD = "Legacy2711-"
    MY_API_KEY="your_api_key_here"
    

class configDevTest(config):
    SERVER_LOCAL = "database-1.cp4cmc08k900.ap-south-1.rds.amazonaws.com"
    USER_LOCAL = "admin"
    PORT_LOCAL = "1433"
    # PASSWORD_LOCAL= "Admin@123"
    PASSWORD_LOCAL="Legacy2711-"
    DB_LOCAL = "projectTriumphTest"
    # URL = "https://39f2-2401-4900-1ca3-7b94-89d0-b947-92f9-217a.ngrok-free.app/"
    URL = "http://z2puat.in/"
    GEMINI_KEY = "AIzaSyC0fylPcv1EufknkpmPxycy0GPZXFw9YsE"
    OPENAI_APIKEY = "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"
    APP_DOWNLOAD_URL = "https://www.rajatyadav.info/"

    MAIL_SERVER = "smtpout.secureserver.net"
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = "awareness@b2z.club"
    MAIL_PASSWORD = "Legacy2711-"
    MY_API_KEY="your_api_key_here"