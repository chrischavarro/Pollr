import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import pollsReducer from './pollsReducer';
import voteReducer from './voteReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  polls: pollsReducer,
  vote: voteReducer
});
