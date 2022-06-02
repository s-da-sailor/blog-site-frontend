import classes from '../styles/Stories.module.css';
import React, { useState, useEffect } from 'react';
import Story from './Story';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

export default function UserSpecificStories({ username }) {
  const { findUserSpecificStories } = useUserContext();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllStories = async () => {
      try {
        setLoading(true);
        const allStories = await findUserSpecificStories(username);
        setStories(allStories.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
    };
    getAllStories();
  }, [findUserSpecificStories, username]);

  return (
    <>
      {!loading && stories.length > 0 && (
        <div className={classes.stories}>
          {stories &&
            stories.length &&
            stories.map((story) => (
              <Link to={`/stories/${story.id}`} key={story.id} className="current-user">
                <Story
                  title={story.title}
                  description={story.description}
                  author={story.author}
                  updatedAt={new Date(story.updatedAt).toUTCString()}
                  createdAt={new Date(story.createdAt).toUTCString()}
                />
              </Link>
            ))}
        </div>
      )}
      {!loading && stories.length === 0 && (
        <div className={classes.noStories}>
          <h1>No blog found!</h1>
        </div>
      )}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </>
  );
}
