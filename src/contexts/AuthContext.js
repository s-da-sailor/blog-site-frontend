import React, { useContext, useState } from 'react';
const axios = require('axios').default;
const AuthContext = React.createContext();

const URL = 'http://localhost:8000';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const user = localStorage.getItem('user');
  const [currentUser, setCurrentUser] = useState(user);

  const signup = (userDetails) => {
    axios.post(`${URL}/api/v1/users/signup`, userDetails).then((response) => {
      if (!!response.data.data) {
        setCurrentUser(response.data.data.username);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', response.data.data.username);
      }
      return response;
    });
  };

  const login = (userDetails) =>
    axios.post(`${URL}/api/v1/users/login`, userDetails).then((response) => {
      if (!!response.data.data) {
        setCurrentUser(response.data.data.username);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', response.data.data.username);
      }
      return response;
    });

  const logout = () =>
    axios.post(`${URL}/api/v1/users/logout`).then(() => {
      setCurrentUser(null);
      localStorage.clear();
    });

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
