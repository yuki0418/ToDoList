import {
  SET_SELECTED_TODO,
  EDIT_SELECTED_TODO,
  SAVE_SELECTED_TODO_SUCCESS,
  RESET_SELECTED_TODO
} from '../actions/actionTypes';

const selectedTodo = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_TODO:
      return {
        ...state, 
        ...action.todo
      }

    case EDIT_SELECTED_TODO:      
      return {
        ...state, 
        ...action.newSelectedTodo
      }

    case SAVE_SELECTED_TODO_SUCCESS:
      return {
        ...state,
        ...action.todo
      }

    case RESET_SELECTED_TODO:
      return null

    default:
      return state;
  }
}

export default selectedTodo;