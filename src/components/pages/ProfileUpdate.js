import Form from '../Form';
import classes from '../../styles/ProfileUpdate.module.css';
import TextInput from '../TextInput';
import Button from '../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { useAuthContext } from '../../contexts/AuthContext';

export default function ProfileUpdate() {
  const { currentUserId, logout } = useAuthContext();
  const { username } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateUserByUserId } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUserId !== username) {
      navigate('/');
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      const userDetails = {};

      if (name) userDetails.fullName = name;
      if (email) userDetails.email = email;
      if (password) userDetails.password = password;
      //if (passwordConfirm) userDetails.passwordConfirm = passwordConfirm;

      setLoading(true);
      await updateUserByUserId(userDetails, username);
      await logout();
      setError('');

      navigate(`/users/${username}`);
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
      console.log(err);
    }
  }
  return (
    <div>
      <Form className={`${classes.signup}`} onSubmit={handleSubmit}>
        <h3>Enter new name: </h3>
        <TextInput
          type="text"
          icon="person"
          placeholder="new name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <h3>Enter new email: </h3>
        <TextInput
          type="text"
          icon="alternate_email"
          placeholder="new email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <h3>Enter new password: </h3>
        <TextInput
          type="password"
          icon="lock"
          placeholder="new password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <h3>Confirm new password: </h3>
        <TextInput
          type="password"
          icon="lock_clock"
          placeholder="new password"
          value={passwordConfirm}
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <br />
        <Button disabled={loading} type="submit">
          Update Profile
        </Button>

        {error && <p className="error">{error}</p>}
      </Form>
    </div>
  );
}
