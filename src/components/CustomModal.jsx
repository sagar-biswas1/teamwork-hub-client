import React from 'react';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    maxWidth: '500px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};
Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, title, children }) => {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#4A5568';
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Custom Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)} className="text-xl font-bold mb-4">
        {title}
      </h2>
      <button onClick={onRequestClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        &times;
      </button>
      <div className="space-y-4">
        {children}
      </div>
    </Modal>
  );
};



export default CustomModal