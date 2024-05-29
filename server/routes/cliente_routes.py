from flask import Blueprint, request, jsonify
from config.database import db
from models import user_model

cliente_bp = Blueprint('cliente_bp', __name__, url_prefix='/routes')


@cliente_bp.route("/cliente", methods=("GET", "POST"))
def registrar_cliente(cliente=None):
    # listagem dos clientes
    if request.method == "GET":
        clientes = user_model.Cliente.query.all()
        return jsonify([cliente.serialize() for cliente in clientes]), 200
    # adicionar novo cliente
    elif request.method == "POST":
        data = request.get_json()
        cliente_nome = data["nome"]
        cliente_email = data['email']
        cliente_senha = data['senha']
        cliente = user_model.Cliente(
            nome=cliente_nome,
            email=cliente_email,
            senha=cliente_senha
        )
        if not cliente_nome or not cliente_email or not cliente_senha:
            return jsonify('Faltam dados obrigatórios'), 404

        db.session.add(cliente)
        db.session.commit()
        return jsonify("Cliente cadastrado com sucesso"), 200
