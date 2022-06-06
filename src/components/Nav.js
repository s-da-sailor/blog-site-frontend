import Account from './Account';
import classes from '../styles/Nav.module.css';
import logo from '../assets/images/logo-jab.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src={logo} alt="Just Another Blogsite Logo" />
            <h3>Just Another Blogsite</h3>
          </Link>
        </li>
      </ul>
      <div className={classes.searchUserContainer}>
        <span className="material-icons-outlined" title="Search">
          search
        </span>
        <input
          type="text"
          placeholder="Search by username"
          className={classes.searchUser}
          onKeyDown={handleSearch}
        ></input>
      </div>

      <Account />
    </nav>
  );
}
