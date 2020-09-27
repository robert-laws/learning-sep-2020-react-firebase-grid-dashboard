import { UPDATE_USER_APP_STATE, GET_USER_BY_UID, CLEAR_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_USER_APP_STATE:
      return {
        ...state,
        ...action.payload,
      };

    case GET_USER_BY_UID:
      return {
        ...state,
        userProfile: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        userProfile: null,
      };

    default:
      return state;
  }
};
