import classes from '../../styles/Profile.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
  const [error, setError] = useState('');
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
        setError(err.response.data.message);
        if (err.response.status === 404) {
          navigate('/notfound');
        }
      }
    };
    getUser();
  }, [findUserByUsername, username, navigate]);

  const handleUpdateButtonClick = () => {
    navigate(`/users/${username}/edit`);
  };

  const handleDeleteButtonClick = () => {
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUserByUsername(username);
      setCurrentUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
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
      {error && <p className="error">{error}</p>}
      {loading && <div>Loading...</div>}
    </>
  );
}
