import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const[userId, setUserId] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData.name);
    setUserId(userData.id)
    console.log(userData);
  };

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,userId, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
