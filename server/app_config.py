import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:hot4@127.0.0.1:5432/m&s'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY ='SECRET'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    CORS_HEADERS = 'Content-Type'