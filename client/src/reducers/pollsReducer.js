import { FETCH_POLLS, CAST_VOTE } from '../actions/types';

export default function(state=[], action) {
  switch(action.type) {
    case FETCH_POLLS:
      // console.log('Poll reducer', action)
      return action.payload.data;
    // case CAST_VOTE:
    // console.log('Cast vote received', action.payload.data)
    //   return action;
    default:
      return state;
  }
}
