from flask import Flask
from flask_cors import CORS
# from flask_bcrypt import Bcrypt
from extensions import bcrypt
from flask_mail import Mail

# from flask_apscheduler import APScheduler

# deployment_type = "local"
deployment_type = "devTest"
# deployment_type = "prod"

#def create_app():
app = Flask(__name__, static_folder='static')
CORS(app)
bcrypt.init_app(app)
mail = Mail(app)
# bcrypt = Bcrypt(app)

if deployment_type == "prod":
    app.config.from_object('config.configProd')

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    # blueprint for non-auth parts of app
    from main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from apiMain import apiMain as apiMain
    app.register_blueprint(apiMain)

elif deployment_type == "devTest":
    app.config.from_object('config.configDevTest')

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    # blueprint for non-auth parts of app
    from main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from apiMain import apiMain as apiMain
    app.register_blueprint(apiMain)



elif deployment_type == "local":
    app.config.from_object('config.configLocal')

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    # blueprint for non-auth parts of app
    from main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from apiMain import apiMain as apiMain
    app.register_blueprint(apiMain)

#return app
print("Dep Type: ", deployment_type)
mail.init_app(app)
if __name__ == '__main__':
    print("I am main func")
    app.debug = True
    app.run(host= '0.0.0.0')