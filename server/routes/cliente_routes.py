from flask import Blueprint, request, jsonify
from models.user_model import Cliente
from flask_jwt_extended import create_access_token, jwt_required
from datetime import timedelta
from service.client_service import validar_dados_cliente, criar_cliente, atualizar_cliente
from config.database import db

cliente_bp = Blueprint('cliente_bp', __name__, url_prefix='/routes')

@cliente_bp.route("/cliente", methods=("GET", "POST"))
def registrar_cliente(cliente=None):
    # Listagem dos clientes
    if request.method == "GET":
        clientes = Cliente.query.all()
        return jsonify([cliente.serialize() for cliente in clientes]), 200
    # Adicionar novo cliente
    elif request.method == "POST":
        data = request.get_json()
        is_valid, error_message = validar_dados_cliente(data)
        if not is_valid:
            return jsonify({'error': error_message}), 400
        
        cliente = criar_cliente(data)
        access_token = create_access_token(identity=cliente.id, expires_delta=timedelta(hours=1))

        return jsonify({
            "message": "Cliente cadastrado com sucesso",
            "access_token": access_token
        }), 200

@cliente_bp.route("/cliente/<int:cliente_id>", methods=["DELETE"])
@jwt_required()
def deletar_cliente(cliente_id):
    cliente = Cliente.query.get(cliente_id)
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404

    db.session.delete(cliente)
    db.session.commit()

    return jsonify({'message': 'Cliente deletado com sucesso'}), 200

@cliente_bp.route("/cliente/<int:cliente_id>", methods=["PUT"])
@jwt_required()
def atualizar_cliente_route(cliente_id):
    data = request.get_json()
    cliente = Cliente.query.get(cliente_id)
    
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404

    is_valid, error_message = atualizar_cliente(cliente, data)
    if not is_valid:
        return jsonify({'error': error_message}), 400

    return jsonify({'message': 'Cliente atualizado com sucesso'}), 200
