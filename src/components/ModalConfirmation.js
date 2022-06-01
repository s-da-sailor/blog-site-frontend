import classes from '../styles/ModalConfirmation.module.css';
import { useStoryContext } from '../contexts/StoryContext';
import { useNavigate } from 'react-router-dom';

export default function ModalConfirmation({ closeModal, id }) {
  const { deleteStoryById } = useStoryContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteStoryById(id);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div className={classes.titleCloseBtn}>
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className={classes.title}>
          <h2>Are you sure you want to delete this blog?</h2>
        </div>
        <div className={classes.footer}>
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button className={classes.deleteButton} onClick={handleDelete}>
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
}
