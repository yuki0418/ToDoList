import React from 'react';
import Aux from '../../hoc/Aux';
import { IoIosCloseCircleOutline } from "react-icons/io";

import "./Modal.scss";

const Modal = (props) => {
  return (
    <Aux>
      {props.show ? 
        <div className="Backdrop" onClick={props.backdropClicked}></div>
        : null}

      <div 
        className="Modal"
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        <div className="Modal-header">
          <div className="Modal-header_child"></div>
          <div className="Modal-header_child">
            <h2 className="heading-3">{props.title}</h2>
          </div>
          <div className="Modal-header_child">
            <IoIosCloseCircleOutline 
              className="btn_close"
              onClick={props.closeBtnClicked}/>
          </div>
        </div>
        <div className="Modal-body">
          {props.children}
        </div>  
      </div>
    </Aux>
  )
}

export default Modal;