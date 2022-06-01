import classes from '../styles/ButtonProfileUpdate.module.css';

export default function ButtonProfileUpdate({ onClick, text }) {
  return (
    <div className={`${classes.updateButton}`} onClick={onClick}>
      <span className={`material-icons-outlined ${classes.open}`}> edit </span> {text}
    </div>
  );
}
