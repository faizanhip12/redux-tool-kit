import React,{useState,useEffect} from 'react'
import Toast from 'react-bootstrap/Toast';

function Toastt({ show, onClose, message }) {
    useEffect(() => {
        let timer
        if (show) {
          timer = setTimeout(() => {
            onClose();
          }, 2000); // Close after 2 seconds
        }
        return () => {
          clearTimeout(timer);
        };
      }, [show, onClose]);
    
      return (
        <Toast show={show} onClose={onClose}>
          {/* <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header> */}
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      );
}

export default Toastt