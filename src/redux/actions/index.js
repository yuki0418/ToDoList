import {
  RESET_TODOLIST,
  RECIEVED_TODOS,
  ADD_TODO_SUCCESS,
  EDIT_TODO,
  DELETE_TODO_SUCCESS,
  SET_SELECTED_TODO,
  EDIT_SELECTED_TODO,
  SAVE_SELECTED_TODO_SUCCESS,
  RESET_SELECTED_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_COMPLETE_SUCCESS,
  START_REQUEST,
  FINISH_REQUEST
} from './actionTypes';

import { API } from '../../constants/api';

export const onInit = () => {
  return dispatch => {
    dispatch(resetSelectedTodo());
    dispatch(resetTodoList());
  }
};

const startRequest = () => ({
  type: START_REQUEST,
});

const finishRequest = () => ({
  type: FINISH_REQUEST,
});


const recieveTodoList = (todos) => ({
  type: RECIEVED_TODOS,
  todos
});

const resetTodoList = () => ({
  type: RESET_TODOLIST
});

export const getTodos = (token) => {  
  return (dispatch, getState) => {
    let method = 'GET';
    dispatch(startRequest());
    fetch(API + 'todo/todoList', {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
      .then(response => response.json())
      .then(data => {
        dispatch(finishRequest());
        dispatch(recieveTodoList(data.todos));  
      })
      .catch(err => {
        dispatch(finishRequest());
        alert('Faild get todo list')
        console.log(err);
      })
  }
};

export const addTodo = (todo, token) => {
  return (dispatch, getState) => {
    dispatch(startRequest());
    let method = 'POST';
    fetch(API + 'todo/todo', {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(data => {
        dispatch(addTodoSuccess(data));
        dispatch(finishRequest());
      })
      .catch(err => {
        console.log(err);
        dispatch(finishRequest());
        alert('Faild adding new todo');
        dispatch(getTodos(token));
      })
  }
}

const addTodoSuccess = todo => ({
  type: ADD_TODO_SUCCESS,
  ...todo
});

export const editTodo = updatedTodo => ({
  type: EDIT_TODO,
  updatedTodo
});

export const deleteTodo = (_id, token) => {
  return (dispatch, getState) => {
    let method = 'DELETE';
    fetch(API + 'todo/todo/' + _id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: method
    })
      .then(response => response.json())
      .then(data => {
        dispatch(deleteTodoSuccess(data._id));
      })
      .catch(err => {
        alert('Faild to delete todo');
        console.log(err);
        dispatch(getTodos(token));
      })
  }
};

const deleteTodoSuccess = _id => ({
  type: DELETE_TODO_SUCCESS,
  _id
})

export const setSelectedTodo = todo => ({
  type: SET_SELECTED_TODO,
  todo
});

export const editSelectedTodo = newSelectedTodo => ({
  type: EDIT_SELECTED_TODO,
  newSelectedTodo
});

export const saveSelectedTodo = (newSelectedTodo, token) => {
  return (dispatch, getState) => {
    let _id = newSelectedTodo._id;
    let method = 'PUT';
    fetch(API + 'todo/todo/' + _id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: method,
      body: JSON.stringify(newSelectedTodo)
    })
      .then(res => res.json())
      .then(data => {
        dispatch(saveSelectedTodoSuccess(data.todo));
        dispatch(getTodos(token));
      })
      .catch(err => {
        alert('Faild to save todo');
        dispatch(getTodos(token));
        console.log(err);
      })
  }
}

const saveSelectedTodoSuccess = todo => ({
  type: SAVE_SELECTED_TODO_SUCCESS,
  todo
})

const resetSelectedTodo = () => ({
  type: RESET_SELECTED_TODO
})


export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter 
});

export const toggleComplete = (_id, token) => {
  return (dispatch, getState) => {
    let method = 'PUT';
    let state = getState();
    let todo = state.todos.todos.find(todo => todo._id === _id);
    todo.isCompleted = !todo.isCompleted;
    fetch(API + 'todo/todo/' + _id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      method: method,
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(data => {
        dispatch(toggleCompleteSuccess(data.todo));
      })
      .catch(err => {
        alert('Faild to toggle flag')
        console.log(err);
        dispatch(getTodos(token));
      })
  }
};

const toggleCompleteSuccess = todo => ({
  type: TOGGLE_COMPLETE_SUCCESS,
  todo
})