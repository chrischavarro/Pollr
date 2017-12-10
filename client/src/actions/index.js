import axios from "axios";
import { FETCH_USER, FETCH_POLLS, DELETE_POLL } from "./types";

export const loginSubmit = (credentials, history) => {
  axios.post("/api/login", credentials).then(() => {
    history.push("/polls");
    window.location.reload();
  });
};

export const signupSubmit = (credentials, history) => {
  axios.post('/api/signup', credentials)
  .then(() => {
    history.push('/login');
  });
};

export const fetchPolls = () => async dispatch => {
  const request = await axios.get("/api/polls");
  dispatch({ type: FETCH_POLLS, payload: request });
};

export const addOptions = (options, pollId, history) => {
  axios.post(`/api/polls/${pollId}`, options);
  history.push(`/polls/${pollId}`);
  fetchPoll(pollId);
};

export const deletePoll = (pollId, history) => {
  axios.post(`/api/polls/${pollId}/delete`).then(() => {
    history.push("/polls");
    window.location.reload();
  });
  return { type: DELETE_POLL, payload: "Confirmed deletion" };
};

export const castVote = (vote, pollId) => async dispatch => {
  axios.post(`/api/vote/${vote}`, pollId);
  dispatch(fetchPoll(`${pollId}`));
};

export const fetchPoll = pollId => async dispatch => {
  const request = await axios.get(`/api/polls/${pollId}`);
  dispatch({ type: FETCH_POLLS, payload: request });
};

export const submitPoll = (values, history) => {
  axios.post("/api/polls", values).then(res => console.log(res));
  history.push("/polls");
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
