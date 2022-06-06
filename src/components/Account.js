import classes from '../styles/Account.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function Account() {
  const { currentUser, logout, verify } = useAuthContext();

  useEffect(() => {
    const verifyToken = async () => {
      await verify();
    };

    verifyToken();
  }, [verify]);

  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <Link to={`/users/${currentUser}`}>
            <span style={{ color: 'rgb(36, 36, 250)' }}>{currentUser}</span>
          </Link>
          <br />
          <span className="material-icons-outlined" title="Logout">
            logout
          </span>
          <span onClick={logout} style={{ color: 'rgb(36, 36, 250)' }}>
            Logout
          </span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <br />
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
}
