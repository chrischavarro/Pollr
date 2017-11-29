import { FETCH_POLLS } from '../actions/types';

export default function(state=[], action) {
  switch(action.type) {
    case FETCH_POLLS:
      // console.log('Poll reducer', action)
      return action.payload.data;
    default:
      return state;
  }
}
