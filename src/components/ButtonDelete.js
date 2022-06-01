import classes from '../styles/ButtonDelete.module.css';

export default function ButtonDelete({ onClick, text }) {
  return (
    <div className={`${classes.deleteButton}`} onClick={onClick}>
      <span className={`material-icons-outlined ${classes.open}`}> delete </span> {text}
    </div>
  );
}
