import Form from './Form';
import classes from './../styles/Signup.module.css';
import TextInput from './TextInput';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
const base64 = require('base-64');

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuthContext();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      const userDetails = {
        username,
        name,
        email,
        password: base64.encode(password),
        passwordConfirm: base64.encode(passwordConfirm),
      };

      await signup(userDetails);

      setError(false);
      setLoading(true);

      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  return (
    <Form className={`${classes.signup}`} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter username"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        required
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        Submit Now
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
