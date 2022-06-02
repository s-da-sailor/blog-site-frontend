import React, { useState, useContext } from 'react';
const axios = require('axios').default;
const UserContext = React.createContext();

const URL = 'http://localhost:8000';

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [showPostButton, setShowPostButton] = useState(true);

  const findUserByUsername = (username) => axios.get(`${URL}/api/v1/users/${username}`);

  const updateUserByUsername = (userDetails, username) => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    return axios.patch(`${URL}/api/v1/users/${username}`, userDetails, config);
  };

  const deleteUserByUsername = (username) => {
    const token = localStorage.getItem('token');

    return axios.delete(`${URL}/api/v1/users/${username}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },

      data: {},
    });
  };

  const findUserSpecificStories = (username) => axios.get(`${URL}/api/v1/users/${username}/stories`);

  const value = {
    showPostButton,
    setShowPostButton,
    findUserByUsername,
    updateUserByUsername,
    deleteUserByUsername,
    findUserSpecificStories,
  };

  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
}
