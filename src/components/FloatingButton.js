import classes from '../styles/FloatingButton.module.css';
import { useNavigate } from 'react-router-dom';

export default function FloatingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/stories');
  };

  return (
    <div className={`${classes.floatingBtn}`} onClick={handleClick}>
      <span className={`material-icons-outlined ${classes.open}`}> add_circle_outline </span> POST A BLOG
    </div>
  );
}
