import React, { useContext, useState, useEffect } from 'react';
const axios = require('axios').default;
const AuthContext = React.createContext();

axios.defaults.withCredentials = true;

//const URL = 'http://localhost:8000';
const URL = 'https://just-another-blogsite-server.herokuapp.com';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const config = {
          withCredentials: true,
        };
        const data = {};
        const userDetails = await axios.post(`${URL}/api/v1/users/verify`, data, config);

        if (userDetails.data && userDetails.data.data) setCurrentUser(userDetails.data.data.username);
        else {
          setCurrentUser(null);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    verifyToken();
  });

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

  const verify = async () => {
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

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    verify,
  };

  return <AuthContext.Provider value={value}> {!loading && children}</AuthContext.Provider>;
}
