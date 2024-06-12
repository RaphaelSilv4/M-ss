from flask import Blueprint, jsonify, request, Flask
from models import user_model
from werkzeug.security import check_password_hash
from flask_jwt_extended import JWTManager, create_access_token

login_bp = Blueprint('login_bp', __name__, url_prefix='/login')


@login_bp.route("/", methods=["POST"])
def login():
    email = request.json.get('email')
    senha = request.json.get('senha')

    if not email or not senha:
        return jsonify({'error': 'Email ou senha faltando'}), 400

    usuario = user_model.Cliente.query.filter_by(email=email).first()

    if not usuario or not check_password_hash(usuario.senha, senha):
        return jsonify({'error': 'Email ou senha incorretos'}), 401

    access_token = create_access_token(identity=usuario.id)
    return jsonify({'message': 'Login bem-sucedido', 'access_token': access_token}), 200

