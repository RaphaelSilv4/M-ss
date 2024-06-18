from models.user_model import Client
from config.database import db
from flask_bcrypt import check_password_hash, generate_password_hash
import re


def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email)

def validate_client_data(data):
    client_name = data.get('name')
    client_email = data.get('email')
    client_password = data.get('password')
    
    if not client_name or not client_email or not client_password:
        return False, 'Faltam dados obrigatórios'
    
    if not (client_email):
        return False, 'Email inválido'
    
    return True, None

def create_client(data):
    client = Client(name=None,email=None,password=None)
    client_name = data.get("name")
    client_email = data.get("email")
    client_password = data.get("password")
    client.name = client_name
    client.email = client_email
    client.password = generate_password_hash(client_password).decode('utf-8')
    
    db.session.add(client)
    db.session.commit()
    
    return client

def update_client(client, data):
    client_name = data.get('name')
    client_email = data.get('email')
    client_password = data.get('password')
    
    if client_name:
        client.name = client_name

    if client_email:
        if not (client_email):
            return False, 'Email inválido'
        client.email = client_email

    if client_password:
        client.password = generate_password_hash(client_password).decode('utf-8')

    db.session.commit()
    return True, None
def authenticate_user(email,password):
        user = db.session.execute(db.select(Client).filter_by(email=email)).scalar_one_or_none()
        if user == None:
            raise Exception("usuario não cadastrado")
        if not check_password_hash(user.password, password):
            raise Exception("Senha incorreta")
        else: 
            print("senha correta")
        return user
        