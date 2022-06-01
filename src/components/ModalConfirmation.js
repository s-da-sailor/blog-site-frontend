import classes from '../styles/ModalConfirmation.module.css';

export default function ModalConfirmation({ handleDelete, closeModal, text }) {
  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div className={classes.titleCloseBtn}>
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className={classes.title}>
          <h2>Are you sure you want to delete this {text}?</h2>
        </div>
        <div className={classes.footer}>
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button className={classes.deleteButton} onClick={handleDelete}>
            Delete {text}
          </button>
        </div>
      </div>
    </div>
  );
}
