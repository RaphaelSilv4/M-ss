import styled from "styled-components";

const ProfileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background: rgba(15, 15, 15, .9);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: solid 1px rgba(255, 255, 255, .07);
  border-top: solid 1px rgba(255, 255, 255, .07);
  transition: transform 0.3s ease-in-out;
  transform: ${({ isopen }) => isopen ? 'translateX(0)' : 'translateX(100%)'};
  z-index: 1000;

  @media (max-width: 760px) {
    width: 200px;
    font-size: .8rem;
  }

`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-bottom: 1px solid #ccc;
`;

const ProfileName = styled.span`
  font-weight: bold;
  margin-right: 10rem;
  color: aliceblue;

  @media (max-width: 760px) {
    font-size: .6rem;
  }

`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: .625rem;
  margin-left: 1.25rem;
  cursor: pointer;
  color: #fff;
  
  &:hover {
    background-color: #333;
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const ButtonAccount = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export { ProfileMenu, ProfileHeader, ProfileName, MenuItems, MenuItem, ButtonAccount, CloseButton, IconWrapper };
