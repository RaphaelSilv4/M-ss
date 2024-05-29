from flask import Blueprint, jsonify, request
from models import user_model
from config.database import db

cargo_bp = Blueprint('cargo_bp', __name__, url_prefix='/cargos')


@cargo_bp.route("/cliente/<int:cliente_id>", methods=["PUT"])
def atribuir_cargo(cliente_id):
    data = request.get_json()
    novo_cargo_nome = data.get('cargo')

    if not novo_cargo_nome:
        return jsonify({'error': 'Cargo não especificado'}), 400

    cliente = user_model.Cliente.query.get_or_404(cliente_id)
    cargo = user_model.Cargo.query.filter_by(nome=novo_cargo_nome).first()

    if not cargo:
        return jsonify({'error': 'Cargo inválido'}), 400

    cliente.cargo = novo_cargo_nome
    db.session.commit()

    return jsonify({'message': f'Cargo atribuído com sucesso para {cliente.nome}'}), 200
