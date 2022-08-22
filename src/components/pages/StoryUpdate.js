import classes from '../../styles/StoryUpdate.module.css';
import React from 'react';
import Button from '../Button';
import Form from '../Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStoryContext } from '../../contexts/StoryContext';
import { useUserContext } from '../../contexts/UserContext';
import { useAuthContext } from '../../contexts/AuthContext';

export default function StoryUpdate() {
  const { currentUser } = useAuthContext();
  const { id } = useParams();
  const { findStoryById, updateStoryById } = useStoryContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setShowPostButton } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    setShowPostButton(false);

    const getStory = async () => {
      try {
        const singleStory = await findStoryById(id);

        if (singleStory.data.data.authorUsername !== currentUser) {
          navigate('/');
        }

        setTitle(singleStory.data.data.title);
        setDescription(singleStory.data.data.description);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.response.data);
        if (err.status === 404) {
          navigate('/');
        }
      }
    };
    getStory();

    return () => {
      setShowPostButton(true);
    };
  }, [setShowPostButton, findStoryById, id, currentUser, navigate]);

  async function handlePost(e) {
    e.preventDefault();

    try {
      const storyDetails = {
        title,
        description,
      };

      setLoading(true);

      await updateStoryById(storyDetails, id);

      setError('');

      navigate(`/stories/${id}`);
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
      console.log(err);
    }
  }

  return (
    <div className={classes.story}>
      <Form onSubmit={handlePost}>
        <h3 className={classes.title}>Edit title:</h3>
        <textarea
          className={classes.storyTitle}
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
        ></textarea>
        <br />
        <br />
        <h3 className={classes.title}>Edit description:</h3>
        <textarea
          className={classes.storyDescription}
          id="description"
          name="description"
          required
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
        ></textarea>
        <br />
        <br />
        <Button disabled={loading} type="submit">
          UPDATE BLOG
        </Button>

        {error && <p className="error">{error}</p>}
      </Form>
    </div>
  );
}
