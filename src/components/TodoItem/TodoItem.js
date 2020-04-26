import React from 'react';
import { FaFlag, FaRegFlag } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import "./TodoItem.scss";
import { connect } from 'react-redux';
import { 
  toggleComplete,
  deleteTodo,
  setSelectedTodo
} from '../../redux/actions';

import {months, days} from '../../constants/dateTypes';

const TodoItem = (props) => {
  const clickedIsCompleted = () => {
    props.toggleComplete(props.item._id, props.auth.token);
  }

  const clickedDelete = () => {
    props.deleteTodo(props.item._id, props.auth.token);
    props.setSelectedTodo(null); // Unselect the selected todo
  }

  const handlerItemSelected = () => {
    props.setSelectedTodo(props.item);
  }

  const formatDate = (fullDate) => {
    const newDate = new Date(fullDate);
    const year = newDate.getFullYear();
    const month = months[newDate.getMonth()];
    const day = days[newDate.getDay()];
    const date = newDate.getDate();
    const formatedDate = day + ' ' + date + '/' + month + '/' + year;

    return formatedDate;
  }

  const showSrtingWithMaxLength = (str, length) => {
    if(str.length > length) {
      const maxStr = str.slice(0, length) + '...';
      return maxStr;
    }
    return str;
  }

  return (
    <div className="TodoItem" onClick={handlerItemSelected}>
      <div className={'color'} style={{'backgroundColor': props.item.color}}></div>
      <div className="detail">
        <div className="title">
         <h1>{showSrtingWithMaxLength(props.item.title, 20)  || "Undifine"}</h1>
        </div>
        <h3>
          {' ' + formatDate(props.item.from)}
          {formatDate(props.item.to) ? ' - ' + formatDate(props.item.to) : null}
        </h3>
        <p>{showSrtingWithMaxLength(props.item.location, 40)}</p>
      </div>
      <div className="icons">
        <div className="icon" onClick={clickedIsCompleted}>
          { 
            props.item.isCompleted ? 
              <FaFlag size={16} style={{color: 'red'}}/>
              : <FaRegFlag size={16}/>
          }
        </div>
        <div className="icon" onClick={clickedDelete}>
          <MdDeleteForever style={{color: 'red'}} size={20}/>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => {
  return {
    setSelectedTodo: (todo) => dispatch(setSelectedTodo(todo)),
    toggleComplete: (id, token) => dispatch(toggleComplete(id, token)),
    deleteTodo: (id, token) => dispatch(deleteTodo(id, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);