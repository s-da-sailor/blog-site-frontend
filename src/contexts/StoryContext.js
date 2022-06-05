import React, { useContext } from 'react';
const axios = require('axios').default;
const StoryContext = React.createContext();

axios.defaults.withCredentials = true;

const URL = 'http://localhost:8000';

export function useStoryContext() {
  return useContext(StoryContext);
}

export function StoryContextProvider({ children }) {
  const findAllStories = () => axios.get(`${URL}/api/v1/stories`);

  const findStoryById = (storyId) => axios.get(`${URL}/api/v1/stories/${storyId}`);

  const createStory = (storyDetails) => {
    const config = {
      withCredentials: true,
    };

    return axios.post(`${URL}/api/v1/stories/`, storyDetails, config);
  };

  const updateStoryById = (storyDetails, storyId) => {
    const config = {
      withCredentials: true,
    };

    return axios.patch(`${URL}/api/v1/stories/${storyId}`, storyDetails, config);
  };

  const deleteStoryById = (storyId) => {
    return axios.delete(`${URL}/api/v1/stories/${storyId}`, {
      withCredentials: true,
      data: {},
    });
  };

  const value = {
    findAllStories,
    findStoryById,
    createStory,
    updateStoryById,
    deleteStoryById,
  };

  return <StoryContext.Provider value={value}> {children}</StoryContext.Provider>;
}
