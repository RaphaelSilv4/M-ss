from flask import Blueprint, request, jsonify
from service.comment_service import CommentService
from flask_jwt_extended import jwt_required, get_jwt_identity

comment_bp = Blueprint('comment_bp', __name__, url_prefix='/comments')

@comment_bp.route("/", methods=["POST"])
@jwt_required()
def create_comment():
    data = request.get_json()
    user_id = get_jwt_identity()
    movie_id = data.get('movie_id')
    content = data.get('content')

    if not movie_id or not content:
        return jsonify({"error": "Dados incompletos"}), 400

    comment = CommentService.create_comment(user_id, movie_id, content)
    return jsonify(comment), 201

@comment_bp.route("/<int:comment_id>", methods=["PUT"])
@jwt_required()
def update_comment(comment_id):
    data = request.get_json()
    content = data.get('content')

    if not content:
        return jsonify({"error": "Conteúdo necessário"}), 400

    updated_comment = CommentService.update_comment(comment_id, content)
    if updated_comment:
        return jsonify(updated_comment), 200
    return jsonify({"error": "Comentário não encontrado"}), 404

@comment_bp.route("/<int:comment_id>", methods=["DELETE"])
@jwt_required()
def delete_comment(comment_id):
    success = CommentService.delete_comment(comment_id)
    if success:
        return jsonify({"message": "Comentário deletado com sucesso"}), 204
    return jsonify({"error": "Comentário não encontrado"}), 404

@comment_bp.route("/<int:comment_id>", methods=["GET"])
def get_comment(comment_id):
    comment = CommentService.get_comment(comment_id)
    if comment:
        return jsonify(comment), 200
    return jsonify({"error": "Comentário não encontrado"}), 404

@comment_bp.route("/<int:comment_id>/like", methods=["POST"])
@jwt_required()
def like_comment(comment_id):
    comment = CommentService.like_comment(comment_id)
    if comment:
        return jsonify(comment), 200
    return jsonify({"error": "Comentário não encontrado"}), 404

@comment_bp.route("/<int:comment_id>/dislike", methods=["POST"])
@jwt_required()
def dislike_comment(comment_id):
    comment = CommentService.dislike_comment(comment_id)
    if comment:
        return jsonify(comment), 200
    return jsonify({"error": "Comentário não encontrado"}), 404