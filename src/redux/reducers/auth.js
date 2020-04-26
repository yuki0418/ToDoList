import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  AUTH_FAILD,
} from '../actions/actionTypes';

const defaultState = {
  currentUser: null,
  token: null,
  error: null
}

const auth = (state = defaultState, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload.user,
        token: action.payload.token
      }

    case SIGNUP:
      return {
        ...state,
      }

    case LOGOUT:
      return {
        ...state,
        ...defaultState
      }

    case AUTH_FAILD:
      return {
        ...state,
        error: action.payload.error
      }

    default: 
      return {
        ...state
      };
  }
}

export default auth;