import axios from 'axios';
import { FETCH_USER, LOGIN_SUBMIT, FETCH_POLLS } from './types';

export const loginSubmit = (credentials, history) => {
   axios.post('/api/login', credentials)
    .then((res) => console.log(res))

    // dispatch({ type: FETCH_USER, payload: res.data });


    history.push('/')

    // .then((res) => dispatch({ type: LOGIN_SUBMIT, payload: res.data })

  // console.log('request received', credentials);
};

export const fetchPolls = () => async dispatch => {
  const request = await axios.get('/api/polls');

  dispatch({ type: FETCH_POLLS, payload: request });
};

export const submitPoll = (values, history) => {
  console.log(values);
  axios.post('/api/polls', values)
    .then((res) =>
    console.log(res)
  )
  // return { type: FETCH_POLLS, payload: res.data}
  history.push('/');

  // dispatch
};
// export const submitPoll = (values, history) => async dispatch => {
//   console.log(values);
//   const res = await axios.post('/api/polls', values)
//
//   history.push('/');
//   dispatch({ type: FETCH_POLLS, payload: res.data})
// };

// export const loginSubmit = (credentials) => async dispatch => {
//   console.log('action received', credentials)
//   const res = await axios.post('/api/login', credentials)
//   dispatch({ type: LOGIN_SUBMIT, payload: res.data });
// };

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};
