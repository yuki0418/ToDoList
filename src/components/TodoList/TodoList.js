import React, { Component } from 'react';
import "./TodoList.scss";

import { connect } from 'react-redux';
import { 
  setVisibilityFilter,
  getTodos,
  onInit
} from '../../redux/actions';
import { VisibilityFilters } from '../../redux/actions/actionTypes';

import Aux from '../../hoc/Aux';
import TodoToggleButton from '../TodoToggleButton/TodoToggleButton';
import TodoItem from '../TodoItem/TodoItem';
import AddButton from '../AddButton/AddButton';
import Modal from '../../container/Modal/Modal';
import AddTodo from '../AddTodo/AddTodoForm';



class TodoList extends Component {
  state = {
    showModal: false,
  }

  clickFilterHandler = (filter) => {
    this.props.setVisibilityFilter(filter);
  };

  addBtnClicked = (state) => {
    if(!state.showModal)
      this.modalToggle();
  }

  modalToggle = () => {
    this.setState(state => ({
      showModal: !state.showModal
    }));
  }

  closeModal = () => {
    this.setState(state => ({
      showModal: false
    }))
  }

  componentDidMount = () => {
    this.props.onInit();
    this.props.getTodos(this.props.auth.token);
  }

  render() {
    return(
      <Aux>
        <div className="TodoList">
          <TodoToggleButton toggled={this.clickFilterHandler}/>
          {
            this.props.todoList ?
              this.props.todoList.map((item, key) => {
              return <TodoItem 
                        key={key} 
                        item={item} />
            })
            : null
          }
        </div>
        <AddButton clicked={this.addBtnClicked}/>
        <Modal 
          title="Add Todo"
          show={this.state.showModal}
          backdropClicked={this.closeModal}
          closeBtnClicked={this.modalToggle}>
          <AddTodo completedAdding={this.closeModal}/>
        </Modal>
      </Aux>
    )
  }
}

const getVisibleTodos = (state, filter) => {
  const todoList = state.todos;
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todoList;
    case VisibilityFilters.SHOW_COMPLETED:
      return todoList.filter(todo => todo.isCompleted);
    case VisibilityFilters.SHOW_INCOMPLETED:
      return todoList.filter(todo => !todo.isCompleted);
    default:
      throw new Error('Unknown Filter: ' + filter);
  }
};

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  const todoList = getVisibleTodos(state.todos, visibilityFilter);
  return {todoList, auth: state.auth};
}

const mapDispatchToProps = dispatch => {
  return {
    getTodos: (token) => dispatch(getTodos(token)),
    setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
    onInit: () => dispatch(onInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);