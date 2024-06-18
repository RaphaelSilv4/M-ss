import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from '../../services';
import api_key from '../../api_key';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import {
  Container,
  ProfileContainer,
  ProfileDetails,
  ProfileImage,
  Timeline,
  FavoritesList,
  CommentsList,
  InputFile,
  Label,
  FileName,
  StyledLink
} from './ProfileStyles';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';


const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState([]);
  const [detailedFavorites, setDetailedFavorites] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch favorites
        const favoritesResponse = await axios.get('/favorites/');
        const fetchedFavorites = favoritesResponse.data;
        setFavorites(fetchedFavorites);

        // Fetch detailed favorites
        const fetchDetailedFavorites = fetchedFavorites.map(async favorite => {
          try {
            const response = await fetch(`https://api.themoviedb.org/3/${favorite.media_type}/${favorite.media_id}?api_key=${api_key}&language=pt-BR&page=1`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          } catch (error) {
            console.error(`Error fetching details for ${favorite.media_type} ${favorite.media_id}:`, error);
            return null;
          }
        });

        // Wait for all detail requests to complete
        const detailedResults = await Promise.all(fetchDetailedFavorites);
        setDetailedFavorites(detailedResults.filter(item => item !== null));
        console.log(detailedResults);

        // Fetch comments
        const commentsResponse = await axios.get('/comments/');
        const fetchedComments = commentsResponse.data;
        setComments(fetchedComments);

      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (
    <Container>
      <ProfileContainer>
        <ProfileDetails>
          <ProfileImage>
            <img src={profileImage || 'default-profile.png'} alt="Perfil" />
            <h1>{isAuthenticated ? user : 'Usuário'}</h1>
            <Label htmlFor="file-input">Adicionar Foto</Label>
            <InputFile
              id="file-input"
              type="file"
              accept="image/*"
              aria-label="Upload profile image"
              onChange={handleProfileImageChange}
            />
          </ProfileImage>
          <FileName>{profileImage ? 'Arquivo selecionado' : 'Nenhum arquivo selecionado'}</FileName>
          <StyledLink to="/userSetting">
            <AiOutlineEdit />
            Alterar dados
          </StyledLink>
        </ProfileDetails>
        <Timeline>
          <h2>Favoritos</h2>
          <div>
            {detailedFavorites.length === 0 && <h3>Nenhum favorito encontrado</h3>}
            {detailedFavorites.length > 0 && <h3>Clique na imagem para ver mais detalhes</h3>}
            {detailedFavorites.length > 0 && <StyledLink to='/favorites'>Ver mais</StyledLink>}
          </div>
          <FavoritesList>

              {detailedFavorites.map(item => (
                <li key={item.id}>
                  <Link to={`/details/${item.media_type}/${item.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
                  </Link>
                  <span>{item.title || item.name}</span>
                </li>
              ))}

          </FavoritesList>
          <h2>Comentários</h2>
          <CommentsList>
            {comments.length === 0 && <p>Nenhum comentário encontrado</p>}
            {comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </CommentsList>
        </Timeline>
      </ProfileContainer>
    </Container>
  );
};

export default Profile;
