import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ isAuthed, isLoading, isAdmin, ...props }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthed) {
    return <Redirect to='/' />;
  }

  if (!isAdmin) {
    return <Redirect to='/' />;
  }

  return <Route {...props} />;
};
