import {
  UPDATE_USER_APP_STATE,
  GET_USER_BY_UID,
  CLEAR_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_IMAGE,
} from '../types';

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

    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };

    case UPDATE_USER_PROFILE_IMAGE:
      return {
        ...state,
        userProfileImage: action.payload,
      };

    case CLEAR_USER:
      return {
        ...state,
        userProfile: null,
        userProfileImage: null,
        isAdmin: false,
      };

    default:
      return state;
  }
};
