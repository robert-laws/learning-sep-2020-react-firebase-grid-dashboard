import React, { useEffect, useReducer, useCallback } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  UPDATE_USER_APP_STATE,
  GET_USER_BY_UID,
  CLEAR_USER,
  UPDATE_USER_PROFILE,
} from '../types';

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

  const signup = useCallback(
    async (email, password) => {
      let uid = null;
      try {
        const { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        uid = user.uid;

        const data = { user: user.uid, isLoading: false };

        dispatch({ type: UPDATE_USER_APP_STATE, payload: data });
      } catch (error) {
        console.log(error);
      }
      return uid;
    },
    [dispatch]
  );

  const createUser = useCallback(async (uid, firstName, lastName, email) => {
    const userData = {
      firstName,
      lastName,
      email,
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      specialty: '',
      ip: '',
    };
    try {
      await firebase.firestore().collection('users').doc(uid).set(userData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateUserProfile = async (uid, user) => {
    try {
      await firebase.firestore().collection('users').doc(uid).update(user);
      dispatch({ type: UPDATE_USER_PROFILE, payload: user });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  const login = async ({ email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

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

  const clearUser = useCallback(() => {
    dispatch({ type: CLEAR_USER });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userProfile: state.userProfile,
        isLoading: state.isLoading,
        signup,
        createUser,
        login,
        getUserByUid,
        updateUserProfile,
        logout,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
