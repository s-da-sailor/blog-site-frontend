import classes from '../../styles/Profile.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Stories from '../Stories';
import { useUserContext } from '../../contexts/UserContext';
import { useAuthContext } from '../../contexts/AuthContext';
import ButtonProfileUpdate from '../ButtonProfileUpdate';
import ButtonProfileDelete from '../ButtonProfileDelete';
import ModalConfirmation from '../ModalConfirmation';
import UserSpecificStories from '../UserSpecificStories';

export default function Profile() {
  const { currentUser, setCurrentUser } = useAuthContext();
  const { username } = useParams();
  const { findUserByUsername, deleteUserByUsername } = useUserContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [initial, setInitial] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDetails = await findUserByUsername(username);
        setUser(userDetails.data.data);
        setLoading(false);

        const fullName = userDetails.data.data.name;

        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
        let initials = [...fullName.matchAll(rgx)] || [];
        initials = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();

        setInitial(initials);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(true);
      }
    };
    getUser();
  }, [findUserByUsername, username]);

  const handleUpdateButtonClick = () => {
    navigate(`/users/${username}/edit`);
  };

  const handleDeleteButtonClick = () => {
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUserByUsername(username);
      localStorage.clear();
      setCurrentUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!loading && user && (
        <div>
          <div className={classes.profile}>
            <div className={classes.profileInfo}>
              <div className={classes.avatar}>
                <p>{initial}</p>
              </div>
              <div>
                <h2 className={classes.username}>{user.username}</h2>
                <p className={classes.name}>Name: {user.name}</p>
                <p className={classes.email}>Email: {user.email}</p>
              </div>

              <div className={classes.buttonContainer}>
                {currentUser && currentUser === user.username && (
                  <ButtonProfileUpdate onClick={handleUpdateButtonClick} text="EDIT PROFILE" />
                )}
                <br />
                {currentUser && currentUser === user.username && (
                  <ButtonProfileDelete onClick={handleDeleteButtonClick} text="DELETE PROFILE" />
                )}
              </div>
            </div>
            {currentUser && currentUser === username && showModal && (
              <ModalConfirmation closeModal={setShowModal} handleDelete={handleDelete} text="profile" />
            )}
          </div>

          <div className="stories">
            <UserSpecificStories username={username} />
          </div>
        </div>
      )}
      {!loading && !user && <div>No user found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </>
  );
}
