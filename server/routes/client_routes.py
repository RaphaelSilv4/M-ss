from flask import Blueprint, request, jsonify
from models.user_model import Client
from flask_jwt_extended import jwt_required
from service.client_service import create_client, validate_client_data, update_client
from config.database import db


client_bp = Blueprint('client_bp', __name__, url_prefix='/routes')


@client_bp.route("/client", methods=("GET", "POST"))
def register_client():
    
    if request.method == "GET":
        clients = Client.query.all()
        return jsonify([client.serialize() for client in clients]), 200
    
    elif request.method == "POST":
        data = request.get_json()
        is_valid, error_message = validate_client_data(data)
        if not is_valid:
            return jsonify({'error': error_message}), 400
        
        client = create_client(data)

        return jsonify({
            "message": "Cliente cadastrado com sucesso",
        }), 200

@client_bp.route("/client/<int:client_id>", methods=["DELETE"])
@jwt_required()
def delete_client(client_id):
    client = Client.query.get(client_id)
    if not client:
        return jsonify({'error': 'Cliente não encontrado'}), 404

    db.session.delete(client)
    db.session.commit()

    return jsonify({'message': 'Cliente deletado com sucesso'}), 200

@client_bp.route("/client/<int:client_id>", methods=["PUT"])
@jwt_required()
def update_client_route(client_id):
    data = request.get_json()
    client = Client.query.get(client_id)
    
    if not client:
        return jsonify({'error': 'Cliente não encontrado'}), 404

    is_valid, error_message = update_client(client, data)
    if not is_valid:
        return jsonify({'error': error_message}), 400

    return jsonify({'message': 'Cliente atualizado com sucesso'}), 200
