import classes from '../styles/ButtonUpdate.module.css';

export default function ButtonUpdate({ onClick, text }) {
  return (
    <div className={`${classes.updateButton}`} onClick={onClick}>
      <span className={`material-icons-outlined ${classes.open}`}> edit </span> {text}
    </div>
  );
}
