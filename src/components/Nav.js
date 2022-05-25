import Account from './Account';
import classes from '../styles/Nav.module.css';
import logo from '../assets/images/logo-jab.png';
import { Link } from 'react-router-dom';

export default function Nav() {
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
      <Account />
    </nav>
  );
}
