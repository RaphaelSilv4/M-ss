import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: auto;
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
  max-height: auto;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: saturate(180%) blur(10px);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h1 {
    font-size: 1.2rem;
  }

  h2 {
    border-width: 1px;
    border-style: solid;
    border-color: #c2182b;
    border-radius: 6px;
    box-shadow: 0px 0px 4px 0px #222d34;
    margin-top: 10px;
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
    display: block;
    margin: 0 auto;
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

  div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    h3 {
      color: #d3d3d2;
      margin: 10px;
      margin-top: 18px;
    }
  }

`;

export const FavoritesList = styled.ul`
  display: flex;
  flex-direction: wrap;
  list-style: none;
  padding: 0;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    text-align: center;

    img {
      width: 150px;
      height: auto;
      display:flex;
      padding: 10px;
      border-radius: 1rem;
      margin-bottom: .4rem;
      object-fit: cover;
    }

    span {
      display: block;
      color: #d3d3d2;
    }

    a {
        transition: all 0.3s;
    }

    a:hover {
        transform: scale(1.1);
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

