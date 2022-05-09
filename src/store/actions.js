import * as types from './actionsType';
import axios from 'axios';

const getUsers = (user) => ({
  type: types.GET_USERS,
  payload: user,
});

const userUpdated = (user) => ({
  type: types.UPDATE_USER,
  payload: user,
});

const setResponse = (response) => ({
  type: types.SET_RESPONSE,
  payload: response,
});

const setLoading = (loading) => ({
  type: types.SET_LOADING,
  payload: loading,
});

export const loadUsers = () => {
  return function (dispatch) {
    dispatch(setLoading(true));
    axios
      .get('https://ulventech-react-exam.netlify.app/api/form')
      .then((res) => {
        //console.log(res);
        dispatch(getUsers(res.data.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      });
  };
};

export const updateUser = (user) => {
  return function (dispatch) {
    dispatch(setLoading(true));
    axios
      .post('https://ulventech-react-exam.netlify.app/api/form', user)
      .then((res) => {
        console.log(res);
        dispatch(userUpdated(res.data.data));
        dispatch(setResponse(JSON.stringify(res.data)));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      });
  };
};
