import axios from 'axios';
import { FETCH_USER, LOGIN_SUBMIT, FETCH_POLLS, CAST_VOTE, HAS_VOTED } from './types';

// export const loginSubmit = (credentials, history) => async dispatch => {
//   console.log('Login received')
//    const request = await axios.post('/api/login', credentials)
//
//     dispatch({ type: FETCH_USER, payload: request.data });
//     dispatch(fetchUser())
//     history.push('/')
//
// };

// export const hasVoted()


export const addOptions = (options, pollId, history) => {
  axios.post(`/api/polls/${pollId}`, options)
  history.push(`/polls/${pollId}`);
  fetchPoll(pollId);
}

export const loginSubmit = (credentials, history) => {
   axios.post('/api/login', credentials)
    .then((response) => {
      return axios.get('/api/current_user')
    })
    .then((response) => {
      // console.log('Response', response)
      return fetchUser()
    });
    history.push('/')
    fetchUser();

    // axios.get('/api/current_user')
     // ({ type: FETCH_USER, payload: response.data });
};

// export const loginSubmit = (credentials, history) => {
//    axios.post('/api/login', credentials)
//     .then((response) => {
//       return axios.get('/api/current_user')
//     })
//     .then((response) => {
//       console.log('Response', response)
//       return { type: FETCH_USER, payload: response.data }
//     });
//     history.push('/')
//
//     // axios.get('/api/current_user')
//      // ({ type: FETCH_USER, payload: response.data });
// };

export const castVote = (vote, pollId) => async dispatch => {
  const request = await axios.post(`/api/vote/${vote}`, pollId);

  dispatch({ type: CAST_VOTE, payload: request })
  dispatch(fetchPoll(`${pollId}`))
}

export const fetchPoll = (pollId) => async dispatch => {
  const request = await axios.get(`/api/polls/${pollId}`)

  dispatch({ type: FETCH_POLLS, payload: request });
  // console.log('Poll action', pollId)
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

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

// export const submitPoll = (values, history) => async dispatch => {
//   console.log(values);
//   const res = await axios.post('/api/polls', values)
//
//   history.push('/');
//   dispatch({ type: FETCH_POLLS, payload: res.data})
// };

// export const loginSubmit = (credentials, history) => (async (dispatch) => {
//   try {
//     console.log('login action received')
//     // const response = axios.post('/api/login', credentials)
//     // dispatch({ type: FETCH_USER, payload: response.data })
//     // dispatch(fetchUser())
//     // return response.data;
//   } catch(error) {
//     console.log(error)
//   }
// })
