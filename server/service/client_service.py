from models.user_model import Cliente
from config.database import db
from werkzeug.security import generate_password_hash
import re

def validar_email(email):
    padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(padrao, email)

def validar_dados_cliente(data):
    cliente_nome = data.get('nome')
    cliente_email = data.get('email')
    cliente_senha = data.get('senha')
    
    if not cliente_nome or not cliente_email or not cliente_senha:
        return False, 'Faltam dados obrigatórios'
    
    if not validar_email(cliente_email):
        return False, 'Email inválido'
    
    return True, None

def criar_cliente(data):
    cliente_nome = data["nome"]
    cliente_email = data['email']
    cliente_senha = data['senha']
    
    cliente = Cliente(
        nome=cliente_nome,
        email=cliente_email,
        senha=generate_password_hash(cliente_senha)
    )
    db.session.add(cliente)
    db.session.commit()
    
    return cliente

def atualizar_cliente(cliente, data):
    cliente_nome = data.get('nome')
    cliente_email = data.get('email')
    cliente_senha = data.get('senha')
    
    if cliente_nome:
        cliente.nome = cliente_nome

    if cliente_email:
        if not validar_email(cliente_email):
            return False, 'Email inválido'
        cliente.email = cliente_email

    if cliente_senha:
        cliente.senha = generate_password_hash(cliente_senha)

    db.session.commit()
    return True, None
