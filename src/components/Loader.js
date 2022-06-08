import RingLoader from 'react-spinners/RingLoader';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Loader() {
  return (
    <div>
      <Modal isOpen={true}>
        <div
          style={{
            marginTop: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RingLoader color="#407bff" size={300} />
        </div>
      </Modal>
    </div>
  );
}
