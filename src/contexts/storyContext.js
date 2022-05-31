import React, { useContext } from 'react';
const axios = require('axios').default;
const StoryContext = React.createContext();

const URL = 'http://localhost:8000';

export function useStoryContext() {
  return useContext(StoryContext);
}

export function StoryContextProvider({ children }) {
  const findAllStories = () => axios.get(`${URL}/api/v1/stories`);

  const findStoryById = (storyId) => axios.get(`${URL}/api/v1/stories/${storyId}`);

  const createStory = (storyDetails) => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    return axios.post(`${URL}/api/v1/stories/`, storyDetails, config);
  };

  const value = {
    findAllStories,
    findStoryById,
    createStory,
  };

  return <StoryContext.Provider value={value}> {children}</StoryContext.Provider>;
}
