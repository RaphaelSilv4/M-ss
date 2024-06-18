from flask import Blueprint, jsonify, request
from models import user_model
from flask_jwt_extended import create_access_token
from config.database import bcrypt
from service.client_service import authenticate_user

login_bp = Blueprint('login_bp', __name__, url_prefix='/login')


@login_bp.route("/", methods=["POST"])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({'error': 'Email ou senha faltando'}), 400

    try:
        user = authenticate_user(email=email, password=password)
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'message': 'Login bem-sucedido',
            'access_token': access_token,
            'user': user.serialize()  # Retorna os dados do usuário
        }), 200
    except Exception as e:
        print(f"Erro durante a autenticação: {e}")  # Log do erro
        return jsonify({'error': 'Email ou senha incorretos'}), 401