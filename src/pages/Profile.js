import React, { useContext } from 'react';
import UserContext from '../context/user/userContext';

export const Profile = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>ID: {user.uid}</p>
    </div>
  );
};
