import { UPDATE_USER_APP_STATE, CREATE_USER, GET_USER_BY_UID } from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_USER_APP_STATE:
      return {
        ...state,
        user: action.payload,
      };

    case CREATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USER_BY_UID:
      return {
        ...state,
        userProfile: action.payload,
      };

    default:
      return state;
  }
};
