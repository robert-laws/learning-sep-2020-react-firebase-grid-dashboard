import React, { useEffect, useReducer } from 'react';
import { firestore } from '../../firebase/config';
import UserContext from './userContext';
import userReducer from './userReducer';
import firebase from 'firebase/app';
import { SET_USER, CREATE_USER } from '../types';

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
      dispatch({ type: SET_USER, payload: data });
    });

    return unsubscribe;
  }, []);

  const addAuthListener = (callback) => {
    const onChange = (user) => {
      if (user) {
        callback({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        callback(null);
      }
    };

    return firebase.auth().onAuthStateChanged(onChange);
  };

  const createUser = async (user) => {
    console.log(user);

    try {
      // get a reference to the firestore document
      const docRef = firestore.doc(`/users/${user.uid}`);

      // create a user object
      const newUser = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        address: '',
        city: '',
        state: '',
        zip: '',
        specialty: '',
        ip: '',
      };

      // write to cloud firestore
      await docRef.set(newUser);

      dispatch({ type: CREATE_USER, payload: newUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userProfile: state.userProfile,
        isLoading: state.isLoading,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
