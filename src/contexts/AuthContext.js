import React, { useContext, useState } from 'react';
const axios = require('axios').default;
const AuthContext = React.createContext();

const URL = 'http://localhost:8000';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const signup = (userDetails) => {
    axios.post(`${URL}/api/v1/users/signup`, userDetails).then((signupResponse) => {
      if (signupResponse.data.data) {
        setCurrentUser(signupResponse.data.data.username);
        localStorage.setItem('token', signupResponse.data.data.token);
      }
      return signupResponse;
    });
  };

  const login = (userDetails) => axios.post(`${URL}/api/v1/users/login`, userDetails);

  const logout = () =>
    axios.post(`${URL}/api/v1/users/logout`).then(() => {
      setCurrentUser(null);
      localStorage.removeItem('token');
    });

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
