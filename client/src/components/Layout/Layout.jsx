import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styled from 'styled-components';

const MainContainer = styled.main`
  background-color: #000000;
  flex: 1;
  padding-top: 60px;
  padding-bottom: 60px;
`;


const Layout = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;

