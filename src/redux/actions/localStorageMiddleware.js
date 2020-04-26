import {
  LOGIN,
  SIGNUP,
  LOGOUT
} from './actionTypes';

export const localStorageMiddleware = (action) => {
  if(action.type === LOGIN || action.type === SIGNUP) {
    // set storage
    window.localStorage.setItem('jwt', action.payload.token);
    window.localStorage.setItem('userId', action.payload.user._id);
    window.localStorage.setItem('userName', action.payload.user.name);
    // window.localStorage.setItem('expiryDate', action.payload.token);
  } else if(action.type === LOGOUT) {
    // remove storage
    window.localStorage.setItem('jwt', '');
    window.localStorage.setItem('userId', '');
    window.localStorage.setItem('userName', '');
  }
}