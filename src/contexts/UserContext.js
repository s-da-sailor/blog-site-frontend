import React, { useState, useContext } from 'react';
const axios = require('axios').default;
const UserContext = React.createContext();

axios.defaults.withCredentials = false;

const URL = 'https://localhost:7234';

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [showPostButton, setShowPostButton] = useState(true);

  const findUserByUserId = (userId) => axios.get(`${URL}/api/User/${userId}`);

  const updateUserByUserId = (userDetails, userId) => {
    const config = {
      withCredentials: false,
      headers: {
        Authorization: `bearer ${localStorage.getItem('justAnotherToken')}`,
      },
    };

    return axios.put(`${URL}/api/User/${userId}`, userDetails, config);
  };

  const deleteUserByUserId = (userId) => {
    return axios.delete(`${URL}/api/User/${userId}`, {
      withCredentials: false,
      headers: {
        Authorization: `bearer ${localStorage.getItem('justAnotherToken')}`,
      },
      data: {},
    });
  };

  const findUserSpecificStories = (userId, pageNumber, pageSize) =>
    axios.get(`${URL}/api/User/${userId}/blogs?PageNumber=${pageNumber}&PageSize=${pageSize}`);

  const searchUser = (searchParam, pageNumber, pageSize) => {
    const config = {
      withCredentials: false,
      headers: {
        Authorization: `bearer ${localStorage.getItem('justAnotherToken')}`,
      },
    };

    const userDetails = {};

    return axios.post(
      `${URL}/api/User/search/${searchParam}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
      userDetails,
      config
    );
  };

  const value = {
    showPostButton,
    setShowPostButton,
    findUserByUserId,
    updateUserByUserId,
    deleteUserByUserId,
    findUserSpecificStories,
    searchUser,
  };

  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
}
