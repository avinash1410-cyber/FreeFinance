import React, { useState } from 'react';
import './notifications.css'; // Import your CSS file

function NotificationPopup() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button onClick={toggleModal}>show</button>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <p>This is a notification popup!</p>
            <p>This is a notification popup!</p>
            <p>This is a notification popup!</p>
            <p>This is a notification popup!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationPopup;
