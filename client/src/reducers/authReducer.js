import { FETCH_USER, LOGIN_SUBMIT } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
    console.log('Fetch user detected', action);
      return action.payload || false;
    case LOGIN_SUBMIT:
    console.log('Login detected', action.payload.data)
      return action.payload.data;
    default:
      return state;
  }
}
