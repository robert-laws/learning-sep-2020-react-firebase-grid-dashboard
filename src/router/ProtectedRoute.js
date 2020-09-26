import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAuthed, isLoading, ...props }) => {
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!isAuthed) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
