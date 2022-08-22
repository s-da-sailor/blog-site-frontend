import React, { useContext } from 'react';
const axios = require('axios').default;
const StoryContext = React.createContext();

axios.defaults.withCredentials = false;

const URL = 'https://localhost:7234';

export function useStoryContext() {
  return useContext(StoryContext);
}

export function StoryContextProvider({ children }) {
  const findAllStories = (pageNumber, pageSize) =>
    axios.get(`${URL}/api/Blog?PageNumber=${pageNumber}&PageSize=${pageSize}`);

  const findStoryById = (storyId) => axios.get(`${URL}/api/Blog/${storyId}`);

  const createStory = (storyDetails) => {
    const config = {
      withCredentials: false,
      headers: {
        Authorization: `bearer ${localStorage.getItem('justAnotherToken')}`,
      },
    };

    return axios.post(`${URL}/api/Blog/`, storyDetails, config);
  };

  const updateStoryById = (storyDetails, storyId) => {
    const config = {
      withCredentials: false,
      headers: {
        Authorization: `bearer ${localStorage.getItem('justAnotherToken')}`,
      },
    };

    return axios.put(`${URL}/api/Blog/${storyId}`, storyDetails, config);
  };

  const deleteStoryById = (storyId) => {
    return axios.delete(`${URL}/api/Blog/${storyId}`, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('justAnotherToken')}`,
      },
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
