from flask_cors import CORS
from flask import Flask
from config.database import db, bcrypt
from routes.cliente_routes import cliente_bp
from routes.login import login_bp
from routes.cargo_routes import cargo_bp
from routes.tmdb_api import tmdb_bp
from routes.comment_routes import comment_bp
from routes.favorites_routes import favorite_bp
from flask_jwt_extended import JWTManager
from app_config import Config

app = Flask(__name__)
app.config.from_object(Config)


jwt = JWTManager(app)

db.init_app(app)
bcrypt.init_app(app)

app.register_blueprint(cliente_bp)
app.register_blueprint(cargo_bp)
app.register_blueprint(login_bp)
app.register_blueprint(tmdb_bp)
app.register_blueprint(comment_bp)
app.register_blueprint(favorite_bp)
CORS(app)


if __name__ == '__main__':
    app.run()

