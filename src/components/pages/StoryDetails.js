import classes from '../../styles/StoryDetails.module.css';
import React, { useState, useEffect } from 'react';
import { useStoryContext } from '../../contexts/StoryContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import ButtonUpdate from '../ButtonUpdate';
import ButtonDelete from '../ButtonDelete';
import ModalConfirmation from '../ModalConfirmation';
const axios = require('axios').default;

//const URL = 'http://localhost:8000';
const URL = 'https://just-another-blogsite-server.herokuapp.com';

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

  const downloadFile = (fileType, fileExt) => {
    const getStory = async () => {
      const config = {
        headers: {
          Accept: fileType,
        },
        withCredentials: true,
      };

      const response = await axios.get(`${URL}/api/v1/stories/${id}`, config);
      let responseData = response.data;
      if (fileExt === 'json') responseData = JSON.stringify(responseData);

      const responseBlob = new Blob([responseData], { type: 'octet-stream' });
      const url = window.URL.createObjectURL(responseBlob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${story.title}.${fileExt}`);

      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.parentNode.removeChild(link);
    };

    getStory();
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
          <div className={classes.contentNegotiation}>
            <p className={classes.contentNegotiationTitle}>Download: </p>
            <p onClick={() => downloadFile('application/json', 'json')}>JSON</p>
            <p onClick={() => downloadFile('application/xml', 'xml')}>XML</p>
            <p onClick={() => downloadFile('text/plain', 'txt')}>Plain Text</p>
            <p onClick={() => downloadFile('text/html', 'html')}>HTML</p>
          </div>
        </div>
      )}
      {!loading && !story && <div>No story found!</div>}
      {error && <p className="error">{error}</p>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
