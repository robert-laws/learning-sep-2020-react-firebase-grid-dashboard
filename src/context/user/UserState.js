import React, { useEffect, useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import firebase from 'firebase/app';
import { SET_USER } from '../types';

const UserState = ({ children }) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const unsubscribe = addAuthListener((user) => {
      const data = { user };
      dispatch({ type: SET_USER, payload: data });
    });

    return unsubscribe;
  }, []);

  const addAuthListener = (callback) => {
    const onChange = (user) => {
      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    };

    return firebase.auth().onAuthStateChanged(onChange);
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
