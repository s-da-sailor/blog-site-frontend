import classes from '../styles/Account.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

export default function Account() {
  const { currentUser, logout } = useAuthContext();
  console.log(localStorage.getItem('token'), currentUser);

  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            account_circle
          </span>
          <span>{currentUser}</span>
          <br />
          <span className="material-icons-outlined" title="Logout">
            logout
          </span>
          <span onClick={logout}>Logout</span>
        </>
      ) : (
        <>
          <Link to="login">Login</Link>
          <br />
          <Link to="signup">Signup</Link>
        </>
      )}
    </div>
  );
}
