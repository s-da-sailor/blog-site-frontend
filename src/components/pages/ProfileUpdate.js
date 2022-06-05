import Form from '../Form';
import classes from '../../styles/ProfileUpdate.module.css';
import TextInput from '../TextInput';
import Button from '../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';

export default function ProfileUpdate() {
  const { username } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateUserByUsername } = useUserContext();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      const userDetails = {};

      if (name) userDetails.name = name;
      if (email) userDetails.email = email;
      if (password) userDetails.password = password;
      if (passwordConfirm) userDetails.passwordConfirm = passwordConfirm;

      setLoading(true);
      await updateUserByUsername(userDetails, username);
      setError('');

      navigate(`/users/${username}`);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
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
          placeholder="new name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <h3>Enter new email: </h3>
        <TextInput
          type="text"
          icon="alternate_email"
          placeholder="new email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <h3>Enter new password: </h3>
        <TextInput
          type="password"
          icon="lock"
          placeholder="new password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <h3>Confirm new password: </h3>
        <TextInput
          type="password"
          icon="lock_clock"
          placeholder="new password (optional)"
          value={passwordConfirm}
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
