import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../../contexts/AuthContext';

import { ButtonAccount, ProfileMenu, ProfileHeader, ProfileName, MenuItems, MenuItem, CloseButton, IconWrapper } from './styles';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { CgCloseO, CgBookmark } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";


const ProfileMenuComponent = () => {
  const [isopen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isopen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    closeMenu();
    navigate('/profile');
  };

  const handleFavoritesClick = () => {
    closeMenu();
    navigate('/favorites');
  }

  const handleSettingsClick = () => {
    closeMenu();
    navigate('/userSetting');
  }

  const handleLogoutClick = () => {
    closeMenu();
    navigate('/login');
  };

  return (
    <>
      <ButtonAccount onClick={toggleMenu} aria-label="Open menu"><MdOutlineAccountCircle size={30} /></ButtonAccount>
      <ProfileMenu isopen={isopen ? 'true' : undefined}>
        <ProfileHeader>
          <MdOutlineAccountCircle size={30} aria-label="Profile icon" />
          <ProfileName>{context.isAuthenticated ? 'User auth':'No access'}</ProfileName>
          <CloseButton onClick={closeMenu} aria-label='Close menu'><CgCloseO size={20} /></CloseButton>
        </ProfileHeader>
        <MenuItems>
          <MenuItem onClick={handleProfileClick}>
            <IconWrapper>
              <FaRegUser size={20} />
            </IconWrapper>
            Perfil
          </MenuItem>
          <MenuItem onClick={handleFavoritesClick}>
            <IconWrapper>
              <CgBookmark size={20} />
            </IconWrapper>
            Favoritos
          </MenuItem>
          <MenuItem onClick={handleSettingsClick}>
            <IconWrapper>
              <IoSettingsOutline size={20} />
            </IconWrapper>
            Configurações
          </MenuItem>
          <MenuItem onClick={handleLogoutClick}>
            <IconWrapper>
              <AiOutlineLogin size={20} />
            </IconWrapper>
            Login/out
          </MenuItem>
        </MenuItems>
      </ProfileMenu>
    </>
  );
};

export default ProfileMenuComponent;
