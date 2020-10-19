import React, { useEffect, useReducer, useCallback } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firestore, storage } from '../../firebase/config';
import {
  UPDATE_USER_APP_STATE,
  GET_USER_BY_UID,
  CLEAR_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_IMAGE,
} from '../types';

const UserState = ({ children }) => {
  const initialState = {
    user: null,
    userProfile: null,
    userProfileImage: null,
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
      await firestore.collection('users').doc(uid).update(user);
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

  const uploadUserImage = async (uid, file) => {
    const filePath = `users/${uid}/profile-image`;
    const fileRef = storage.ref().child(filePath);

    try {
      const uploadSnapshot = await fileRef.put(file);
      const downloadImageUrl = await uploadSnapshot.ref.getDownloadURL();

      const profileImage = { url: downloadImageUrl };

      dispatch({ type: UPDATE_USER_PROFILE_IMAGE, payload: profileImage });
    } catch (error) {
      console.log(error);
    }
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

  const getUserProfileByUid = useCallback(
    async (uid) => {
      try {
        const filePath = `users/${uid}/profile-image`;
        const downloadImageUrl = await storage
          .ref()
          .child(filePath)
          .getDownloadURL();

        const profileImage = { url: downloadImageUrl };

        dispatch({ type: UPDATE_USER_PROFILE_IMAGE, payload: profileImage });
      } catch (error) {
        console.log(error);
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
        userProfileImage: state.userProfileImage,
        isLoading: state.isLoading,
        signup,
        createUser,
        login,
        getUserByUid,
        getUserProfileByUid,
        updateUserProfile,
        logout,
        clearUser,
        uploadUserImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
