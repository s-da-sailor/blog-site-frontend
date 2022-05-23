import Account from './Account';
import classes from '../styles/Nav.module.css';
import logo from '../assets/images/logo-jab.png';

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <a href="index.html" className={classes.brand}>
            <img src={logo} alt="Just Another Blogsite Logo" />
            <h3>Just Another Blogsite</h3>
          </a>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
