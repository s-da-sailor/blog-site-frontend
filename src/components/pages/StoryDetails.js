import classes from '../../styles/StoryDetails.module.css';
import React, { useState, useEffect } from 'react';
import { useStoryContext } from '../../contexts/storyContext';
import { useParams } from 'react-router-dom';

export default function StoryDetails() {
  const { id } = useParams();
  const { findStoryById } = useStoryContext();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getStory = async () => {
      try {
        const singleStory = await findStoryById(id);
        setStory(singleStory.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
    };
    getStory();
  }, [findStoryById, id]);

  return (
    <div>
      {!loading && story && (
        <div className={classes.story}>
          <h2 className={classes.title}>{story.title}</h2>
          <br />
          <p className={classes.author}>Author: {story.author}</p>
          <br />
          <div className={classes.qmeta}>
            <p className={classes.createdAt}>Created: {new Date(story.createdAt).toUTCString()}</p>
            <p className={classes.updatedAt}>Last Updated: {new Date(story.updatedAt).toUTCString()}</p>
          </div>
          <br />
          <p className={classes.description}>{story.description}</p>
        </div>
      )}
      {!loading && !story && <div>No story found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
