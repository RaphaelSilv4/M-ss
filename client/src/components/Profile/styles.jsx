import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #000000;
`;

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  padding: 20px;
  margin-top: 10px;
  max-width: 1000px;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: saturate(180%) blur(10px);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h1 {
    font-size: 1.2rem;
  }

  h1, h2 {
    color: #fff;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    h1, h2 {
      font-size: 1.5rem;
    }
    padding: .625rem;
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #d4d4d4b0;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid #9c9595;
    object-fit: cover;
    margin-bottom: 10px;
  }
`;

export const Label = styled.label`
  background-color: #ff0000e1;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: #b30000;
  }
`;

export const InputFile = styled.input`
  display: none;
`;

export const FileName = styled.span`
  font-size: 1rem;
  color: #333;
`;
export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FavoritesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;

  li {
    margin: 10px;
    text-align: center;

    img {
      width: 100px;
      height: 150px;
      border-radius: 5px;
      object-fit: cover;
    }

    span {
      display: block;
      margin-top: 5px;
      color: #d3d3d2;
    }
  }
`;

export const CommentsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 10px 0;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #d3d3d2;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #61dafb;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    color: #21a1f1;
  }

  svg {
    margin-right: 5px;
  }
`;

