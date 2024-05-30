from sqlalchemy import Integer, String
from sqlalchemy.orm import  mapped_column
from config.database import db
from werkzeug.security import generate_password_hash 


class Cliente(db.Model):
    __tablename__ = "usuario_cliente"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome = mapped_column(String(30), nullable=False)
    senha = mapped_column(String(1000), nullable=False)
    email = mapped_column(String(90), nullable=False)
    cargo = mapped_column(String(90), default='usuario_cliente')

    def __init__(self, nome, senha, email):
        self.nome = nome
        self.senha = generate_password_hash(senha)
        self.email = email

    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'cargo': self.cargo
        }


class Cargo(db.Model):
    __tablename__ = "cargo"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome = mapped_column(String(30), nullable=False)

    def __repr__(self):
        return f"<Cargo {self.nome}>"

    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'cargo': self.cargo
        }

    def __init__(self, nome, senha, email):
        self.nome = nome
        self.senha = senha
        self.email = email
