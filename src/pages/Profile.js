import React, { useContext } from 'react';
import UserContext from '../context/user/userContext';

export const Profile = () => {
  const userContext = useContext(UserContext);
  const { userProfile } = userContext;

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>
        Name: {userProfile.firstName} {userProfile.lastName}
      </p>
      <p>Email: {userProfile.email}</p>
    </div>
  );
};
