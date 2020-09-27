import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ isAuthed, isLoading, ...props }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthed) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};
