import classes from '../../styles/NotFound.module.css';

export default function NotFound() {
  return (
    <div className={classes.notFoundMessage}>
      <h1>404</h1>
      <br />
      <h1>The requested URL was not found!</h1>
    </div>
  );
}
