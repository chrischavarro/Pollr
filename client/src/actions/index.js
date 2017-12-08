import axios from 'axios';
import { FETCH_USER, LOGIN_SUBMIT, FETCH_POLLS, CAST_VOTE, HAS_VOTED, DELETE_POLL } from './types';

export const fetchPolls = () => async dispatch => {
  const request = await axios.get('/api/polls');
  
  dispatch({ type: FETCH_POLLS, payload: request });
};

export const addOptions = (options, pollId, history) => {
  axios.post(`/api/polls/${pollId}`, options)
  history.push(`/polls/${pollId}`);
  fetchPoll(pollId);
}

export const loginSubmit = (credentials, history) => {
   axios.post('/api/login', credentials)
    history.push('/')
    window.location.reload();
};


export const deletePoll = (pollId, history) => {
   axios.post(`/api/polls/${pollId}/delete`)
    .then(() => {
       history.push('/');
       window.location.reload();
    })

    return { type: DELETE_POLL, payload: 'Confirmed deletion' }
}

export const castVote = (vote, pollId) => async dispatch => {
  const request = await axios.post(`/api/vote/${vote}`, pollId);
// commented out for testing purposes
  // dispatch({ type: CAST_VOTE, payload: request })
  dispatch(fetchPoll(`${pollId}`))
}

export const fetchPoll = (pollId) => async dispatch => {
  const request = await axios.get(`/api/polls/${pollId}`)

  dispatch({ type: FETCH_POLLS, payload: request });
  // console.log('Poll action', pollId)
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

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  console.log('Fetch user action')
  dispatch({ type: FETCH_USER, payload: res.data });
};

// export const submitPoll = (values, history) => async dispatch => {
//   console.log(values);
//   const res = await axios.post('/api/polls', values)
//
//   history.push('/');
//   dispatch({ type: FETCH_POLLS, payload: res.data})
// };
