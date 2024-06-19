import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../services/index.js';
import api_key from '../../api_key/index.js';
import { CgArrowLeftO } from "react-icons/cg";
import { Container, DivMainContainer, List, Midia } from './FavoriteStyles.jsx';

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch favorites from the backend
    axios.get('/favorites/')
      .then(response => {
        setFavorites(response.data);
        console.log(response.data);

        // Fetch details for each favorite item
        const fetchDetailedFavorites = response.data.map(favorite => {
          return fetch(`https://api.themoviedb.org/3/${favorite.media_type}/${favorite.media_id}?api_key=${api_key}&language=pt-BR&page=1`)
            .then(response => response.json())
            .catch(error => {
              console.error(`Error fetching details for ${favorite.media_type} ${favorite.media_id}:`, error);
              return null;
            });
        });

        // Wait for all detail requests to complete
        Promise.all(fetchDetailedFavorites)
          .then(detailedResults => {
            setDetailedFavorites(detailedResults.filter(item => item !== null));
          });
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }, []);

  return (
    <DivMainContainer>
      <Container>
        <button onClick={() => navigate(-1)} style={{ marginRight: '10px' }}>
          <CgArrowLeftO size={20} />
        </button>
        <h2>Favoritos</h2>
        <List>
          {detailedFavorites.map(item => (
            <Midia key={item.id}>
              <Link to={`/details/${item.media_type}/${item.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
              </Link>
              <span>{item.title || item.name}</span>
            </Midia>
          ))}
        </List>
      </Container>
    </DivMainContainer>
  );
}

export default Favorite;
