from models.user_model import Cliente
from config.database import db
from flask_bcrypt import check_password_hash, generate_password_hash
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
    
    if not (cliente_email):
        return False, 'Email inválido'
    
    return True, None

def criar_cliente(data):
    cliente = Cliente(nome=None,email=None,senha=None)
    cliente_nome = data.get("nome")
    cliente_email = data.get("email")
    cliente_senha = data.get("senha")
    cliente.nome = cliente_nome
    cliente.email = cliente_email
    cliente.senha = generate_password_hash(cliente_senha).decode('utf-8')
    
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
        if not (cliente_email):
            return False, 'Email inválido'
        cliente.email = cliente_email

    if cliente_senha:
        cliente.senha = generate_password_hash(cliente_senha)

    db.session.commit()
    return True, None
def authenticate_user(email,senha):
        user = db.session.execute(db.select(Cliente).filter_by(email=email)).scalar_one_or_none()
        if user == None:
            raise Exception("usuario não cadastrado")
        if not check_password_hash(user.senha, senha):
            raise Exception("Senha incorreta")
        else: 
            print("senha correta")
        return user
        