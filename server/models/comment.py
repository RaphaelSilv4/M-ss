from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from config.database import db


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255))
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('usuario_cliente.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

    user = db.relationship("usuario_cliente", backref="comments", lazy=True)
    post = db.relationship("Post", backref="comments", lazy=True)