from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from config.database import db

class Favorite(db.Model):
    __tablename__ = "favorites"
    
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id = mapped_column(Integer, ForeignKey('user_client.id'), nullable=False)
    media_id = mapped_column(String, nullable=False)
    media_type = mapped_column(String, nullable=False)  # Can be 'movie' or 'series'
    added_on = mapped_column(db.DateTime, default=db.func.current_timestamp())

    user = relationship("Client", back_populates="favorites")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'media_id': self.media_id,
            'media_type': self.media_type,
            'added_on': self.added_on
        }
