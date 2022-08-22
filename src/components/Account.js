import classes from '../styles/Account.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Account() {
  const { currentUser, currentUserId, logout } = useAuthContext();

  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <Link to={`/users/${currentUserId}`}>
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
