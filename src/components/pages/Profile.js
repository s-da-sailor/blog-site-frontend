import classes from '../../styles/Profile.module.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Stories from '../Stories';
import { useUserContext } from '../../contexts/UserContext';

export default function Profile() {
  const { username } = useParams();
  const { findUserByUsername } = useUserContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [initial, setInitial] = useState('');

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
            </div>
          </div>

          <div className="stories">
            <Stories />
          </div>
        </div>
      )}
      {!loading && !user && <div>No user found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </>
  );
}
