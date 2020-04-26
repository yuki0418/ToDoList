import {
  LOGIN,
  LOGOUT,
  AUTH_FAILD,
  START_REQUEST,
  FINISH_REQUEST
} from './actionTypes';

import { localStorageMiddleware } from './localStorageMiddleware';

import { API } from '../../constants/api';

const startRequest = () => ({
  type: START_REQUEST,
});

const finishRequest = () => ({
  type: FINISH_REQUEST,
});

export const login = (email, password) => {
  return (dispatch, getState) => {
    dispatch(startRequest());
    let method = 'POST'
    fetch(API + 'auth/login', {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, 
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        // Error handle
        if(data.status === 401 || data.status === 404) {
          // 401 => password is wrong
          // 404 => user not found
          let payload = {
            error: data
          }
          dispatch(loginFaild(payload));
          throw new Error(data);
        }

        let payload = {
          message: data.message,
          token: data.token,
          user: data.user
        }
        let action = {
          type: LOGIN,
          payload
        }
        localStorageMiddleware(action);
        dispatch(loginSuccess(payload));
        dispatch(finishRequest());
      })
      .catch(err => {
        dispatch(finishRequest());
      })
  }
};

export const onLoad = () => {
  return (dispatch, getState) => {
    let token = window.localStorage.getItem('jwt') || null;
    let userId = window.localStorage.getItem('userId') || null;
    let userName = window.localStorage.getItem('userName') || null;    
    let user = {
      userId,
      userName
    }

    if(token) {
      let payload = {
        token,
        user
      }
      dispatch(loginSuccess(payload));
    } else {
      let action = {
        type: LOGOUT
      }
      localStorageMiddleware(action);
      dispatch(logout())
    }
   }
}

export const signup = (email, password, name) => {
  return (dispatch, getState) => {
    dispatch(startRequest());

    let method = 'PUT'
    fetch(API + 'auth/signup', {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email, 
        password: password,
        name: name
      })
    })
    .then(response => response.json())
      .then(data => {
        // Error handle
        if(data.status === 422) {
          // 422 => email is in use
          let payload = {
            error: {
              message: data.data[0].msg,
              status: data.status
            }
          }
          dispatch(loginFaild(payload));
          throw new Error(data);
        }

        //If success to signup -> login
        dispatch(login(email, password));
        dispatch(finishRequest());
      })
      .catch(err => {
        dispatch(finishRequest());
      })
  }
}

export const onLogout = () => {
  return (dispatch, getState) => {
    let action = {
      type: LOGOUT
    }
    localStorageMiddleware(action);
    dispatch(logout());
  }
}

const logout = () => ({
  type: LOGOUT
});

const loginSuccess = (payload) => ({
  type: LOGIN,
  payload
});

const loginFaild = (payload) => ({
  type: AUTH_FAILD,
  payload
})