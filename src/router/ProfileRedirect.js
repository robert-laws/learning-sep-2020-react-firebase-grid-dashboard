import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const ProfileRedirect = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/profile/${user.uid}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProfileRedirect;
