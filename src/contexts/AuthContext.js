import React, { useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
const axios = require('axios').default;
const AuthContext = React.createContext();

axios.defaults.withCredentials = false;

const URL = 'https://localhost:7234';
const usernamePropName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const userIdPropName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('justAnotherToken');

        if (token) {
          const decoded = jwt_decode(token);
          const username = decoded[usernamePropName];
          setCurrentUser(username);
          const userId = decoded[userIdPropName];
          setCurrentUserId(userId);
        } else {
          localStorage.clear();
          setCurrentUser(null);
          setCurrentUserId(null);
        }
        setLoading(false);
      } catch (err) {
        localStorage.clear();
        setCurrentUser(null);
        setCurrentUserId(null);
        setLoading(false);
      }
    };

    verifyToken();
  });

  const signup = async (userDetails) => {
    const response = await axios.post(`${URL}/api/Auth/signup`, userDetails);
    if (response.data) {
      const token = response.data;
      localStorage.setItem('justAnotherToken', token);
      const decoded = jwt_decode(token);
      const username = decoded[usernamePropName];
      setCurrentUser(username);
      const userId = decoded[userIdPropName];
      setCurrentUserId(userId);
    }
    return response;
  };

  const login = async (userDetails) => {
    const response = await axios.post(`${URL}/api/Auth/login`, userDetails);
    if (response.data) {
      const token = response.data;
      localStorage.setItem('justAnotherToken', token);
      const decoded = jwt_decode(token);
      const username = decoded[usernamePropName];
      setCurrentUser(username);
      const userId = decoded[userIdPropName];
      setCurrentUserId(userId);
    }
    return response;
  };

  const logout = async () => {
    await axios.post(`${URL}/api/Auth/logout`);
    setCurrentUser(null);
    setCurrentUserId(null);
    localStorage.clear();
  };

  const verify = async () => {
    const config = {
      withCredentials: false,
      headers: {
        Authorization: `bearer ${localStorage.getItem('justAnotherToken')}`,
      },
    };
    const data = {};
    const response = await axios.post(`${URL}/api/Auth/verify`, data, config);

    if (response.status === 204) {
      const token = localStorage.getItem('justAnotherToken');
      const decoded = jwt_decode(token);
      const username = decoded[usernamePropName];
      setCurrentUser(username);
      const userId = decoded[userIdPropName];
      setCurrentUserId(userId);
    } else {
      setCurrentUser(null);
      setCurrentUserId(null);
      localStorage.clear();
    }
  };

  const value = {
    currentUser,
    currentUserId,
    signup,
    login,
    logout,
    verify,
  };

  return <AuthContext.Provider value={value}> {!loading && children}</AuthContext.Provider>;
}
