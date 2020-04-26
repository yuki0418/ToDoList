import { 
  RECIEVED_TODOS,
  ADD_TODO_SUCCESS,
  EDIT_TODO,
  DELETE_TODO_SUCCESS,
  TOGGLE_COMPLETE_SUCCESS,
  RESET_TODOLIST
} from '../actions/actionTypes';

const todos = (state = [], action) => {
  let newTodos = [];
  switch (action.type) {
    case RECIEVED_TODOS:
      return {
        ...state,
        todos: action.todos
      }

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      }
      
    case EDIT_TODO:      
      return state.map(todo => {
        if(todo.id === action.updatedTodo.id)
          return action.updatedTodo;
        return todo;
      });
      
    case DELETE_TODO_SUCCESS:
      newTodos = state.todos.filter(todo => todo._id !== action._id);
      return {
        ...state,
        todos: newTodos
      }

    case TOGGLE_COMPLETE_SUCCESS:      
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo._id === action.todo._id ? {...todo, isCompleted: todo.isCompleted } : todo
        )
      }

    case RESET_TODOLIST:
      return {
        state: []
      }

    default:
      return state;
  }
}

export default todos;