import classes from '../styles/Stories.module.css';
import React, { useState, useEffect } from 'react';
import Story from './Story';
import { Link } from 'react-router-dom';
import { useStoryContext } from '../contexts/storyContext';

export default function Stories() {
  const { findAllStories } = useStoryContext();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllStories = async () => {
      try {
        const allStories = await findAllStories();
        setStories(allStories.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
    };
    getAllStories();
  }, [findAllStories]);

  return (
    <div>
      {!loading && stories.length > 0 && (
        <div className={classes.stories}>
          {stories &&
            stories.length &&
            stories.map((story) => (
              <Link to={`/stories/${story.id}`} key={story.id}>
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
      {!loading && stories.length === 0 && <div>No story found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
