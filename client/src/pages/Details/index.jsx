import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CgArrowLeftO } from "react-icons/cg";
import { BiLike,BiDislike } from "react-icons/bi";
import { Container, DivMainContainer, CommentBox, CommentInput, CommentButton, DetailsContainer,ButtonLike,ButtonDeslike } from './styles';

function Details() {
  const image_path = 'https://image.tmdb.org/t/p/original';
  const api_key = '4a1166698525f43cab2617b2c5c2b514';
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState({});
  const [comments, setComments] = useState([
    { id: 1, content: 'Ótimo filme, realmente gostei!', likes: 0, dislikes: 0 },
    { id: 2, content: 'A atuação foi incrível!', likes: 0, dislikes: 0 },
    { id: 3, content: 'Esperava mais do final, mas ainda assim foi bom.', likes: 0, dislikes: 0 }
  ]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${api_key}&language=pt-BR&page=1`)
      .then(response => response.json())
      .then(data => {
        const { id, title, name, overview, backdrop_path, release_date,first_air_date
        } = data;

        const mediaItem = {
          id,
          title: title || name,
          overview: overview,
          image: `${image_path}${backdrop_path}`,
          release_date: release_date||first_air_date
          ,
        };
        setMedia(mediaItem);
      });

    // Fetch comments from the server (commented out for now)
    // axios.get(`/comments/${id}`)
    //   .then(response => {
    //     setComments(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching comments:', error);
    //   });
  }, [id, type]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    // Add new comment to the state (simulate adding to server)
    const newCommentData = { id: comments.length + 1, content: newComment, likes: 0, dislikes: 0 };
    setComments([...comments, newCommentData]);
    setNewComment('');

    // Uncomment this section when integrating with a real backend
    /*
    try {
      await axios.post('/comments', {
        media_id: id,
        content: newComment,
      });
      setNewComment('');
      // Refresh comments
      axios.get(`/comments/${id}`)
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    */
  };

  const handleLike = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleDislike = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
    ));
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <DivMainContainer>
      <DetailsContainer style={{ backgroundImage: `url(${media.image})` }}>
        <button onClick={handleGoBack}><CgArrowLeftO size={20} /></button>
        <h1>{media.title}</h1>
        <span>{media.overview}</span>
        <span className="release-date">{media.release_date}</span>
      </DetailsContainer>
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
                  <ButtonLike onClick={() => handleLike(comment.id)}><BiLike size={15}/> ({comment.likes})</ButtonLike>
                  <ButtonDeslike onClick={() => handleDislike(comment.id)}><BiDislike size={15} /> ({comment.dislikes})</ButtonDeslike>
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
