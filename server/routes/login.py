from flask import Blueprint, jsonify, request
from models import user_model
from flask_jwt_extended import create_access_token
from config.database import bcrypt
from service.client_service import authenticate_user

login_bp = Blueprint('login_bp', __name__, url_prefix='/login')


@login_bp.route("", methods=["POST"])
def login():
    email = request.json.get('email')
    senha = request.json.get('senha')
    print(senha)

    if not email or not senha:
        return jsonify({'error': 'Email ou senha faltando'}), 400

    try:
        usuario = authenticate_user(email=email, senha=senha)
        access_token = create_access_token(identity=usuario.id)
        return jsonify({'message': 'Login bem-sucedido', 'access_token': access_token}), 200
    except:
        return jsonify({'error': 'Email ou senha incorretos'}), 401
