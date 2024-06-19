from flask import Blueprint, jsonify, request
from models import user_model
from config.database import db

role_bp = Blueprint('role_bp', __name__, url_prefix='/role')


@role_bp.route("/client/<int:client_id>", methods=["PUT"])
def put_role(client_id):
    data = request.get_json()
    new_role_name = data.get('role')

    if not new_role_name:
        return jsonify({'error': 'Cargo não especificado'}), 400

    client = user_model.Client.query.get_or_404(client_id)
    role = user_model.Role.query.filter_by(nome=new_role_name).first()

    if not role:
        return jsonify({'error': 'Cargo inválido'}), 400

    client.role = new_role_name
    db.session.commit()

    return jsonify({'message': f'Cargo atribuído com sucesso para {client.name}'}), 200
