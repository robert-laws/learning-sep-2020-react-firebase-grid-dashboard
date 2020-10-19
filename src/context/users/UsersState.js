import React, { useReducer, useCallback } from 'react';
import UsersContext from './usersContext';
import usersReducer from './usersReducer';
// import firebase from 'firebase/app';
import { firestore } from '../../firebase/config';
import { GET_ALL_USERS } from '../types';

const UsersState = ({ children }) => {
  const initialState = {
    users: null,
  };

  const [state, dispatch] = useReducer(usersReducer, initialState);

  const getAllUsers = useCallback(async () => {
    try {
      const allUsersCollection = await firestore.collection('users').get();
      const allUsers = allUsersCollection.docs.map((user) => {
        return { ...user.data(), id: user.id };
      });

      dispatch({ type: GET_ALL_USERS, payload: allUsers });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <UsersContext.Provider
      value={{
        users: state.users,
        getAllUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersState;
