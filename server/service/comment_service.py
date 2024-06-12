from models.comment import Comment
from config.database import db

class CommentService:

    @staticmethod
    def create_comment(user_id, movie_id, content):
        new_comment = Comment(user_id=user_id, movie_id=movie_id, content=content)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.serialize()

    @staticmethod
    def update_comment(comment_id, content):
        comment = Comment.query.get(comment_id)
        if comment:
            comment.content = content
            db.session.commit()
            return comment.serialize()
        return None

    @staticmethod
    def delete_comment(comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            db.session.delete(comment)
            db.session.commit()
            return True
        return False

    @staticmethod
    def get_comment(comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            return comment.serialize()
        return None

    @staticmethod
    def like_comment(comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            comment.likes += 1
            db.session.commit()
            return comment.serialize()
        return None

    @staticmethod
    def dislike_comment(comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            comment.dislikes += 1
            db.session.commit()
            return comment.serialize()
        return None