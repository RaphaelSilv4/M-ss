import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #000000 !important;
`;

export const ContainerLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(15, 15, 15, .9);
  backdrop-filter: saturate(180%) blur(10px);

  h1 {
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    text-shadow: 0 0 2px #000;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }

`;
