import classes from '../styles/Illustration.module.css';

export default function Illustration({ children }) {
  return <div className={classes.illustration}>{children}</div>;
}
