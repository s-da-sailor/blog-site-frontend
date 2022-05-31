import classes from '../../styles/StoryPost.module.css';
import React from 'react';
import Button from '../Button';
import Form from '../Form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStoryContext } from '../../contexts/StoryContext';
import { useUserContext } from '../../contexts/UserContext';

export default function StoryPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { createStory } = useStoryContext();
  const { setShowPostButton } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    setShowPostButton(false);
    return () => {
      setShowPostButton(true);
    };
  }, [setShowPostButton]);

  async function handlePost(e) {
    e.preventDefault();

    try {
      const storyDetails = {
        title,
        description,
      };

      setLoading(true);

      await createStory(storyDetails);

      setError(false);

      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  return (
    <div className={classes.story}>
      <Form onSubmit={handlePost}>
        <h3 className={classes.title}>Add a title:</h3>
        <textarea
          className={classes.storyTitle}
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <br />
        <br />
        <h3 className={classes.title}>Add a description:</h3>
        <textarea
          className={classes.storyDescription}
          id="description"
          name="description"
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <br />
        <Button disabled={loading} type="submit">
          POST A NEW BLOG!
        </Button>

        {error && <p className="error">{error}</p>}
      </Form>
    </div>
  );
}
