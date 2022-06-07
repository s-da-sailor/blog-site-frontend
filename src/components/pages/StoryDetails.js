import classes from '../../styles/StoryDetails.module.css';
import React, { useState, useEffect } from 'react';
import { useStoryContext } from '../../contexts/StoryContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import ButtonUpdate from '../ButtonUpdate';
import ButtonDelete from '../ButtonDelete';
import ModalConfirmation from '../ModalConfirmation';

export default function StoryDetails() {
  const { id } = useParams();
  const { findStoryById, deleteStoryById } = useStoryContext();
  const { currentUser } = useAuthContext();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getStory = async () => {
      try {
        const singleStory = await findStoryById(id);
        setStory(singleStory.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.response.data.message);
        if (err.response.status === 404) {
          navigate('/notfound');
        }
      }
    };
    getStory();
  }, [findStoryById, id, navigate]);

  const handleUpdateButtonClick = () => {
    navigate(`/stories/${id}/edit`);
  };

  const handleDeleteButtonClick = () => {
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteStoryById(id);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!loading && story && (
        <div className={classes.story}>
          <div className={classes.titleButtonContainer}>
            <h2 className={classes.title}>{story.title}</h2>
            {currentUser && currentUser === story.author && (
              <ButtonDelete onClick={handleDeleteButtonClick} text="DELETE BLOG" />
            )}
            {currentUser && currentUser === story.author && (
              <ButtonUpdate onClick={handleUpdateButtonClick} text="EDIT BLOG" />
            )}
          </div>

          <br />
          <Link to={`/users/${story.author}`} className={classes.authorContainer}>
            <p className={classes.authorTitle}>Author: </p>
            <p className={classes.author} style={{ color: 'blue' }}>
              {story.author}
            </p>
          </Link>
          {currentUser && currentUser === story.author && showModal && (
            <ModalConfirmation closeModal={setShowModal} handleDelete={handleDelete} text="blog" />
          )}
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
      {error && <p className="error">{error}</p>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
