class config(object):
    SESSION_COOKIE_SECURE = True
    SECRET_KEY = "1740fe41-ff19-481b-8479-45b475c0fe0a"
    SALT = b"\xba\x19\xeb\xbc4\x93\xf1`E\xd1\x96\xec\xdd\xce\xef~\xf4\xa0w`Y\xca\x8a\xeb\xceu\xb2\xddoUg\x16"


class configProd(config):
    SERVER_LOCAL = "10.1.1.4"
    PORT_LOCAL = "1310"
    USER_LOCAL = "Monticola"
    PASSWORD_LOCAL = b"d7For+EdPd0icqm75rzXGoN64RImJm05Cy0YRkG2mGo="
    DB_LOCAL = "PayMateMIS"

    PMX_SERVER = "PMX2.0"
    ONECLICK_SERVER = "OneClickPay"
    CCDB_SERVER = "PayMateCCDB"
    PMCORP_SERVER = "PMCorporate"
    SFACORP_SERVER = "SFACorporate"
    PGSTACK_SERVER = "PGStack"
    PAYMATE_MARKETPLACE_SERVER = "PayMateMarketPlace"
    PAYMATE_AAIARLINE = "AAIairline"

    SERVER = "10.1.1.4"
    PORT = "1310"
    USER = "Monticola"
    PASSWORD = b"W/znSJVXdYdQWLHxESHDSv0Fk4HC00YXVrCtqeXEcgU="
    MASTERGST_CLIENT_ID = "f34fd03e-40d8-4daa-bbd8-65d4e19f0480"
    MASTERGST_CLIENT_SECRET = "9cdb7dd4-6051-438e-b72a-5166acc16e65"
    MASTERGST_USERNAME = "API_PayMate2022"
    MASTERGST_PASSWORD = "Paymate@1"
    GMAIL_USERNAME = "paymatemis@paymate.co.in"
    GMAIL_PASSWORD = "PayM@teM1S"

    # UAE API Creds
    UAE_URL = "https://my.paymate.ae/api/CommonAPI/PayableTransactions"
    UAE_HEADERS = {
        "MMID": "PMXUAEMERCM002",
        "MTID": "PMXUAETERMM002",
        "XpressID": "PAYUAEAPI1",
        "MethodName": "All",
        "IPAdress": "52.140.83.70",
    }


class configLocal(config):
    SERVER_LOCAL = "localhost"
    USER_LOCAL = "sa"
    PORT_LOCAL = "1433"
    # PASSWORD_LOCAL= "Admin@123"
    PASSWORD_LOCAL="MyPass@word"
    DB_LOCAL = "projectTriumph"
    URL = "https://572f-2401-4900-1ca3-7b94-f9e0-5745-bb58-abfe.ngrok-free.app/"
    GEMINI_KEY = "AIzaSyC0fylPcv1EufknkpmPxycy0GPZXFw9YsE"

    SERVER = "192.168.2.4\\UATDB2008"
    PORT = "1310"
    USER = "Citadel"
    PASSWORD = b"WRI8wrsv7jZdrA429rpFlSMnvMEA9/+IE0HT9tWMHfQ="
    MASTERGST_CLIENT_ID = "100248ea-dce1-4c68-b715-a9c7bfccbbd4"
    MASTERGST_CLIENT_SECRET = "a61192a5-7291-45fc-ae61-49dccbad4127"
    MASTERGST_USERNAME = "paymate"
    MASTERGST_PASSWORD = "Paymate@1"
    GMAIL_USERNAME = "paymatemis@paymate.co.in"

    GMAIL_PASSWORD = "PayM@teM1S"

    GMAIL_PASSWORD = "PayM@teM1S"

    # UAE API AUTH
    # Prod
    

    # UAE UAT API
    # UAE_URL = 'https://dev.paymate.in/Beta/PMXUAE/api/CommonAPI/PayableTransactions'
    # UAT_HEADERS = {'MMID':'PMXUAEPMXSCM002', 'MTID':'PMXUAEPMXSCM002','XpressID':'PAYUAEAPI1','MethodName':'All','IPAdress':'171.48.25.159'}
