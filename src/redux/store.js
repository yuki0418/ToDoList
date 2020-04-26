import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';
import thunk from 'redux-thunk';

const store = createStore(
  todoApp,
  applyMiddleware(thunk)
);

export default store;