import React, { useEffect, useReducer, useCallback } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UPDATE_USER_APP_STATE, CREATE_USER, GET_USER_BY_UID } from '../types';

const UserState = ({ children }) => {
  const initialState = {
    user: null,
    userProfile: null,
    isLoading: true,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const unsubscribe = addAuthListener((user) => {
      const data = { user, isLoading: false };
      dispatch({ type: UPDATE_USER_APP_STATE, payload: data });
    });

    return unsubscribe;
  }, []);

  const addAuthListener = (callback) => {
    const onChange = (user) => {
      if (user) {
        callback(user.uid);
      } else {
        callback(null);
      }
    };

    return firebase.auth().onAuthStateChanged(onChange);
  };

  // SIGNUP_USER
  // export const signup = async ({ email, password }) => {
  //   const { user } = await firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password);
  //   return user;
  // };

  // LOGOUT_USER
  // export const logout = () => {
  //   return firebase.auth().signOut();
  // };

  // LOGIN_USER
  // export const login = async ({ email, password }) => {
  //   const { user } = await firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password);
  //   return user;
  // };

  const getUserByUid = useCallback(
    async (uid) => {
      try {
        const userDoc = await firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .get();

        const profile = userDoc.data();

        dispatch({ type: GET_USER_BY_UID, payload: profile });
      } catch (error) {
        console.error('Error getting user profile: ', error);
      }
    },
    [dispatch]
  );

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        getUserByUid,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
