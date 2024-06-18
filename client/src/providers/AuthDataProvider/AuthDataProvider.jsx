// UserDataProvider.js
import React, {  useState } from 'react';
import UserDataContext from "../../contexts/AuthContext";

const UserDataProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addLike = (item) => {
    setLikes([...likes, item]);
  };

  const addFavorite = (item) => {
    setFavorites([...favorites, item]);
  };

  return (
    <UserDataContext.Provider value={{ likes, favorites, addLike, addFavorite }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
export { UserDataContext };