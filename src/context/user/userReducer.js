import { SET_USER, CREATE_USER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case CREATE_USER:
      return {
        ...state,
        userProfile: action.payload,
      };

    default:
      return state;
  }
};
