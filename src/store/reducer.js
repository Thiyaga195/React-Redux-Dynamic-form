import * as types from './actionsType';
const initialState = {
  users: [],
  user: {},
  response: '',
  loading: false,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case types.UPDATE_USER:
      const newState = [...state.users];
      for (let i = 0; i < newState.length; i++) {
        newState[i] = {
          ...newState[i],
          value: action.payload[newState[i].fieldName],
        };
      }
      return {
        ...state,
        loading: false,
        users: newState,
      };
    case types.SET_RESPONSE:
      return {
        ...state,
        response: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducers;
