import React, { useState, useContext } from 'react';
const axios = require('axios').default;
const UserContext = React.createContext();

axios.defaults.withCredentials = true;

//const URL = 'http://localhost:8000';
const URL = 'https://just-another-blogsite-server.herokuapp.com';

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [showPostButton, setShowPostButton] = useState(true);

  const findUserByUsername = (username) => axios.get(`${URL}/api/v1/users/${username}`);

  const updateUserByUsername = (userDetails, username) => {
    const config = {
      withCredentials: true,
    };

    return axios.patch(`${URL}/api/v1/users/${username}`, userDetails, config);
  };

  const deleteUserByUsername = (username) => {
    return axios.delete(`${URL}/api/v1/users/${username}`, {
      withCredentials: true,
      data: {},
    });
  };

  const findUserSpecificStories = (username) => axios.get(`${URL}/api/v1/users/${username}/stories`);

  const searchUser = (query) => {
    const config = {
      withCredentials: true,
    };

    const userDetails = {
      query,
    };

    return axios.post(`${URL}/api/v1/users/search`, userDetails, config);
  };

  const value = {
    showPostButton,
    setShowPostButton,
    findUserByUsername,
    updateUserByUsername,
    deleteUserByUsername,
    findUserSpecificStories,
    searchUser,
  };

  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
}
