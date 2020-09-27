import React, { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UserContext from '../context/user/userContext';

export const Profile = () => {
  const userContext = useContext(UserContext);
  const { user, userProfile } = userContext;

  const { id } = useParams();

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  if (id !== user) {
    return <Redirect to={`/profile/${user}`} />;
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
