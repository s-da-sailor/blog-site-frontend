import React, { useContext, useState, useEffect } from 'react';
const axios = require('axios').default;
const AuthContext = React.createContext();

axios.defaults.withCredentials = true;

const URL = 'http://localhost:8000';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const verifyToken = async () => {
      const config = {
        withCredentials: true,
      };
      const data = {};
      const userDetails = await axios.post(`${URL}/api/v1/users/verify`, data, config);

      if (userDetails.data && userDetails.data.data) setCurrentUser(userDetails.data.data.username);
      else {
        setCurrentUser(null);
      }
    };

    verifyToken();
  }, []);

  const signup = async (userDetails) => {
    const response = await axios.post(`${URL}/api/v1/users/signup`, userDetails);
    if (response.data && response.data.data) {
      setCurrentUser(response.data.data.username);
    }
    return response;
  };

  const login = async (userDetails) => {
    const response = await axios.post(`${URL}/api/v1/users/login`, userDetails);
    if (response.data && response.data.data) {
      setCurrentUser(response.data.data.username);
    }
    return response;
  };

  const logout = async () => {
    await axios.post(`${URL}/api/v1/users/logout`);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
}
