import styled from "styled-components";

const DivMainContainer = styled.div`
  display: block;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  background: #000000 !important;
  margin: 0;  
  padding: 0;  
`;

const Container = styled.div`
  padding: 4rem 0;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: saturate(180%) blur(10px);
  margin: 0; 

`;

const CommentBox = styled.div`
  margin-top: 20px;
  color: #f5f3f3;
  

  h2 {
    color: #f5f3f3;
  }

  li {
    padding: 10px;
    border: 1px solid #a8a5a5;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #a8a5a5;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  color: #f5f3f3;
  font-size: 12pt;
  outline: none;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }

`;

const CommentButton = styled.button`
  background-color: #b62a36;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #6e030c;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }

`;

const ButtonLike = styled.button`
  background: transparent;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #13036e;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }

`;

const ButtonDeslike = styled.button`
  background: transparent;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #6e030c;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }

`;

const DetailsContainer = styled.div`
  background-size: cover;
  background-position: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: calc(100vh - 60px); 
  margin: 0;  
  position: relative; 
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-box-shadow: 0 0 20px 2px rgba(0,0,0,.4);
    box-shadow: 0 0 20px 2px rgba(0,0,0,.4);
    background: rgba(0, 0, 0, 0.5); /* Gradiente escuro */
    z-index: 1;
  }

  h1, span, button {
    position: relative;
    z-index: 2;
  }

  h1 {
    color: #f5f3f3;
    margin: 3rem 0;
    font-size: 40px;
    font-weight: 600
  }

  button {
    background: transparent;
    color: #fdf2f2;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  span {
    color: #D3D3D2;
    line-height: 130%;
    margin-bottom: 1rem;
    font-size: 110%;
    background: rgba(0, 0, 0, 0.7); /* Fundo escuro */
    padding: 10px;
    border-radius: 5px;
  }

  .release-date {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
    font-size: 12px;

    h1 {
      font-size: 30px;
    }

  }

`;

export { Container, CommentBox, CommentInput, CommentButton, DivMainContainer, DetailsContainer,ButtonDeslike,ButtonLike };
