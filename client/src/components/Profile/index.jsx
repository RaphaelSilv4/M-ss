import React, { useState, useEffect } from 'react';

import { Container, ProfileContainer, ProfileDetails, ProfileImage, Timeline, FavoritesList, CommentsList, InputFile, Label, FileName,StyledLink } from './styles';
import { AiOutlineEdit } from 'react-icons/ai';
import axios from '../../services';


const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Simulate fetching favorites
    const fetchedFavorites = [
      {
        id: 1,
        title: 'O Poderoso Chefão',
        poster_path: 'oJagOzBu9Rdd9BrciseCm3U3MCU.jpg'
      },
      {
        id: 2,
        title: 'One Piece 3D2Y',
        poster_path: 'caUI7YlhVXykFWQ7Ul7RQ2wQRpv.jpg'
      },
      {
        id: 3,
        title: 'O Mentalista',
        poster_path: 'd1ZcT5tHzUeQ7zgYecOVoWxH9FL.jpg'
      }
    ];
    setFavorites(fetchedFavorites);

    // Simulate fetching comments
    const fetchedComments = [
      {
        id: 1,
        content: 'Muito bom'
      },
      {
        id: 2,
        content: 'Test!'
      },
      {
        id: 3,
        content: 'Test! Não apenas uma checagem rápida'
      }
    ];
    setComments(fetchedComments);
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
            <img src={profileImage || 'default-profile.png'} alt="Profile" />
            <h1>Usuário</h1>
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
          <FavoritesList>
            {favorites.map((item) => (
              <li key={item.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
                <span>{item.title || item.name}</span>
              </li>
            ))}
          </FavoritesList>
          <h2>Comentários</h2>
          <CommentsList>
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

