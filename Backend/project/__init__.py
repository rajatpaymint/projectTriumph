from flask import Flask
from flask_wtf.csrf import CSRFProtect
# from flask_apscheduler import APScheduler

deployment_type = "local"
# uncomment below line during production 
# deployment_type = "prod"

#def create_app():
app = Flask(__name__, static_folder='static')
csrf = CSRFProtect(app)
#CORS(app)

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

    csrf.exempt(apiMain)


else:
    app.config.from_object('project.config.configLocal')

    #db.init_app(app)
    #s3.init_app(app)

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    # blueprint for non-auth parts of app
    from .main import main as main_blueprint
    app .register_blueprint(main_blueprint)

    from .apiMain import apiMain as apiMain
    app.register_blueprint(apiMain)

    csrf.exempt(apiMain)

#return app
if __name__ == '__main__':
    print("I am main func")
    app.debug = True
    app.run