import React from 'react';

import "./TodoToggleButton.scss";

import { VisibilityFilters } from '../../redux/actions/actionTypes';

const TodoToggleButton = (props) => {
  const onClickHandler = () => {
    let selectedValue = document.querySelector('input[name="isCompleted"]:checked').value;
    props.toggled(selectedValue);
  }
  
  return (
    <div className="TodoToggleButtn">
      <input 
        type="radio" 
        name="isCompleted" 
        value={VisibilityFilters.SHOW_ALL} 
        id="all" 
        hidden 
        defaultChecked={true} 
        onClick={onClickHandler}/>
      <label htmlFor="all" className="radioItem">
        All
      </label>
      <input 
        type="radio" 
        name="isCompleted" 
        value={VisibilityFilters.SHOW_COMPLETED} 
        id="completed" 
        hidden 
        onClick={onClickHandler}/>
      <label htmlFor="completed" className="radioItem">
        Completed
      </label>
      <input 
        type="radio" 
        name="isCompleted" 
        value={VisibilityFilters.SHOW_INCOMPLETED} 
        id="not" 
        hidden onClick={onClickHandler}/>
      <label htmlFor="not" className="radioItem">
        Not Yet
      </label>
    </div>
  )
}

export default TodoToggleButton;