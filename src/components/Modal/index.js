import React,{useState} from 'react';
import './style.scss'

const Modal = ({hideModal,toggleModal,children}) => {

    if(hideModal) return null;

    return(
        <div className="modalOverlay">
            <div className="modal">
                {children}
            </div>
        </div>
    )
}

export default Modal