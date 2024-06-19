import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services';
import api_key from '../../api_key';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CgArrowLeftO } from "react-icons/cg";
import { BsBookmarkPlus } from "react-icons/bs";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { Container, DivMainContainer, CommentBox, CommentInput, CommentButton, DetailsContainer, ButtonLike, ButtonDislike, Overlay, ButtonFavorite } from './styles';

function Details() {
  const image_path = 'https://image.tmdb.org/t/p/original';
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=pt-BR&page=1`)
      .then(response => response.json())
      .then(data => {
        const { id, title, name, overview, backdrop_path, release_date, first_air_date } = data;

        const formattedDate = release_date || first_air_date
          ? format(new Date(release_date || first_air_date), 'dd/MM/yyyy', { locale: ptBR })
          : null;

        const mediaItem = {
          id,
          title: title || name,
          overview: overview,
          image: `${image_path}${backdrop_path}`,
          release_date: formattedDate,
        };
        setMedia(mediaItem);
      });

    // Fetch comments from the server
    api.get(`/comments/media/${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });

    // Check if the media is favorite
    api.get('/favorites/')
      .then(response => {
        const favorites = response.data;
        const isFavorite = favorites.some(favorite => favorite.media_id === parseInt(id, 10));
        setIsFavorite(isFavorite);
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });

  }, [id, type]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/comments/', {
        movie_id: id,
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await api.post(`/comments/${commentId}/like`);
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, ...response.data } : comment
      ));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async (commentId) => {
    try {
      const response = await api.post(`/comments/${commentId}/dislike`);
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, ...response.data } : comment
      ));
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete('/favorites/', { data: { media_id: id } });
        setIsFavorite(false);
      } else {
        await api.post('/favorites/', { media_id: id, media_type: type });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <DivMainContainer>
      <DetailsContainer style={{ backgroundImage: `url(${media.image})` }}>
        <button onClick={handleGoBack}><CgArrowLeftO size={20} /></button>
        <h1>{media.title}</h1>
        <span>{media.overview}</span>
        <span className="release-date">{media.release_date}</span>
        <ButtonFavorite onClick={handleFavorite}>
          <BsBookmarkPlus size={18} />
          {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </ButtonFavorite>
      </DetailsContainer>
      <Overlay />
      <Container>
        <CommentBox>
          <h2>Comentários</h2>
          <form onSubmit={handleCommentSubmit}>
            <CommentInput
              placeholder="Digite seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <CommentButton type="submit">Enviar</CommentButton>
          </form>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                {comment.content}
                <div>
                  <ButtonLike onClick={() => handleLike(comment.id)} liked={comment.liked}>
                    <BiSolidLike size={15} /> ({comment.likes})
                  </ButtonLike>
                  <ButtonDislike onClick={() => handleDislike(comment.id)} disliked={comment.disliked}>
                    <BiSolidDislike size={15} /> ({comment.dislikes})
                  </ButtonDislike>
                </div>
              </li>
            ))}
          </ul>
        </CommentBox>
      </Container>
    </DivMainContainer>
  );
}

export default Details;
