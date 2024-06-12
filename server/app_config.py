import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:Rr159789852@127.0.0.1:5432/M&S'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY ='Pamonha157'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    CORS_HEADERS = 'Content-Type'