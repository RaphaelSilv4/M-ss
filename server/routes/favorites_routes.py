from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.favorites import Favorite
from models.user_model import Cliente
from config.database import db

favorite_bp = Blueprint('favorite_bp', __name__, url_prefix='/favorites')

@favorite_bp.route("/", methods=["POST"])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    data = request.get_json()
    media_id = data.get('media_id')
    media_type = data.get('media_type')

    if not media_id or not media_type:
        return jsonify({'error': 'Parâmetros ausentes'}), 400

    favorite = Favorite(user_id=user_id, media_id=media_id, media_type=media_type)
    db.session.add(favorite)
    db.session.commit()

    return jsonify({'message': 'Favorito adicionado com sucesso'}), 201

@favorite_bp.route("/", methods=["DELETE"])
@jwt_required()
def remove_favorite():
    user_id = get_jwt_identity()
    data = request.get_json()
    media_id = data.get('media_id')

    favorite = Favorite.query.filter_by(user_id=user_id, media_id=media_id).first()
    if not favorite:
        return jsonify({'error': 'Favorito não encontrado'}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({'message': 'Favorito removido com sucesso'}), 200

@favorite_bp.route("/", methods=["GET"])
@jwt_required()
def list_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).order_by(Favorite.added_on.desc()).limit(3).all()
    return jsonify([favorite.serialize() for favorite in favorites]), 200
