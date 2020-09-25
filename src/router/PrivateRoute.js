import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <Route
      {...rest}
      render={(props) => {
        const id = props.match.params.id;

        if (!!user && user.uid === id) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
};

export default PrivateRoute;
