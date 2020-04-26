import { combineReducers } from 'redux';

import todos from './todos';
import visibilityFilter from './visiblityFilter';
import selectedTodo from './selectedTodo';
import isRequest from './isRequest';
import auth from './auth';


const todoApp = combineReducers({
  todos, 
  selectedTodo,
  visibilityFilter,
  isRequest,
  auth
});

export default todoApp;