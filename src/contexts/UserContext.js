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

  const value = {
    showPostButton,
    setShowPostButton,
    findUserByUsername,
  };

  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
}
