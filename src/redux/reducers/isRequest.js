/**
 * If API request is sent and pending, isRequest is ture
 * otherwise isRequest is false
 */

import {
  START_REQUEST,
  FINISH_REQUEST
} from '../actions/actionTypes';

const isRequest = (state = false, action) => {
  switch(action.type) {
    case START_REQUEST:
      return true;
    
      case FINISH_REQUEST:
        return false;

      default:         
        return false;
  }
}

export default isRequest;