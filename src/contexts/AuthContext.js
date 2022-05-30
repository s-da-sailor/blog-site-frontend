import React, { useContext, useState, useEffect } from 'react';
const axios = require('axios').default;
const AuthContext = React.createContext();
const base64 = require('base-64');

const URL = 'http://localhost:8000';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const verifyToken = async () => {
        const config = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        const data = {};
        const userDetails = await axios.post(`${URL}/api/v1/users/verify`, data, config);

        if (userDetails.data.data) setCurrentUser(userDetails.data.data.username);
        else {
          setCurrentUser(null);
          localStorage.clear();
        }
      };

      verifyToken();
    }
  }, []);

  const signup = async (userDetails) => {
    const response = await axios.post(`${URL}/api/v1/users/signup`, userDetails);
    if (!!response.data.data) {
      setCurrentUser(response.data.data.username);
      localStorage.setItem('token', base64.decode(response.data.data.token));
    }
    return response;
  };

  const login = async (userDetails) => {
    const response = await axios.post(`${URL}/api/v1/users/login`, userDetails);
    if (!!response.data.data) {
      setCurrentUser(response.data.data.username);
      localStorage.setItem('token', base64.decode(response.data.data.token));
    }
    return response;
  };

  const logout = async () => {
    await axios.post(`${URL}/api/v1/users/logout`);
    setCurrentUser(null);
    localStorage.clear();
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
