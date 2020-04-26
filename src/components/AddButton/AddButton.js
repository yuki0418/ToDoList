import React from 'react';

import "./AddButton.scss";
import { FaPlus } from 'react-icons/fa';

const AddButton = (props) => {
  return(
    <div className="AddButton" onClick={props.clicked}>
      <FaPlus />
    </div>
  )
}

export default AddButton;