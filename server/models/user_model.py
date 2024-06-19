from sqlalchemy import Integer, String
from sqlalchemy.orm import  mapped_column, relationship
from config.database import db

class Client(db.Model):
    __tablename__ = "user_client"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    name = mapped_column(String(30), nullable=False)
    password = mapped_column(String(1000), nullable=False)
    email = mapped_column(String(90), nullable=False)
    role = mapped_column(String(90), default='user_client')
    comments = relationship("Comment", back_populates='user')
    favorites = relationship("Favorite", back_populates='user', cascade ="all, delete-orphan")

    def __init__(self, name, password, email):
        self.name = name
        self.password = password
        self.email = email
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'favorites': [favorite.serialize() for favorite in self.favorites]
            
        }


class Role(db.Model):
    __tablename__ = "role"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    name = mapped_column(String(30), nullable=False)

    def __repr__(self):
        return f"<role {self.name}>"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role
        }

    def __init__(self, name, password, email):
        self.name = name
        self.password = password
        self.email = email
