from sqlalchemy import Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import mapped_column, relationship
from config.database import db

class Comment(db.Model):
    __tablename__ = "comments"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id = mapped_column(Integer, ForeignKey('usuario_cliente.id'), nullable=False)
    movie_id = mapped_column(Integer, nullable=False)
    content = mapped_column(String(500), nullable=False)
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())
    likes = mapped_column(Integer, default=0)
    dislikes = mapped_column(Integer, default=0)

    user = relationship("Cliente", back_populates="comments")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'likes': self.likes,
            'dislikes': self.dislikes
        }