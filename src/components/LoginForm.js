import Form from './Form';
import classes from './../styles/Login.module.css';
import TextInput from './TextInput';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
const base64 = require('base-64');

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const userDetails = {
        username,
        password: base64.encode(password),
      };

      await login(userDetails);

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
    <Form className={`${classes.login}`} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter username"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button disabled={loading} type="submit">
        Submit Now
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
