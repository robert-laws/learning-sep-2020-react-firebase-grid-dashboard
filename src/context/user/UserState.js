import React, { useEffect, useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import firebase from 'firebase/app';
import { CREATE_USER } from '../types';

const UserState = ({ children }) => {
  const initialState = {
    user: null,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // add code

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
