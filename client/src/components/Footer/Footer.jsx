import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000000;
  text-align: center;
  padding: 40px 0;
  position: relative;
  bottom: 0;
  margin-top: auto;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
`;

const Credits = styled.p`
  margin: 0;
  color: #333;
  font-size: 1.25rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Credits>Créditos: Danilo Medeiros ,Jose Luan ,Raphael Lacerda</Credits>
    </FooterContainer>
  );
};

export default Footer;
