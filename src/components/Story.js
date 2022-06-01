import classes from '../styles/Story.module.css';

export default function Story({ title, description, author, updatedAt, createdAt }) {
  return (
    <div className={classes.story}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.author}>Author: {author}</p>
      <p className={classes.description}>{description}</p>
      <p className={classes.continueReading}>CLICK TO CONTINUE READING...</p>
      <div className={classes.qmeta}>
        <p className={classes.createdAt}>Created: {createdAt}</p>
        <p className={classes.updatedAt}>Last Updated: {updatedAt}</p>
      </div>
    </div>
  );
}
