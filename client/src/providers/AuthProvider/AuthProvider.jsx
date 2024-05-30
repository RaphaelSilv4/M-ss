import { PropTypes } from 'prop-types';
import AuthContext from "../../contexts/AuthContext";
import { useState } from 'react';

function AuthProvider(props) {

  const [isAuthenticated, setIsAuthenticated] = useState(false) 

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
