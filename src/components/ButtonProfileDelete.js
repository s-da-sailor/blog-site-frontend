import classes from '../styles/ButtonProfileDelete.module.css';

export default function ButtonProfileDelete({ onClick, text }) {
  return (
    <div className={`${classes.deleteButton}`} onClick={onClick}>
      <span className={`material-icons-outlined ${classes.open}`}> delete </span> {text}
    </div>
  );
}
