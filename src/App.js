import React, { useContext, useEffect } from 'react';
import './App.scss';
import './firebase/config';
import { ProtectedRoute } from './router';
import UserContext from './context/user/userContext';
import { Header } from './layout';
import { Home, Signup, Login, Profile, ProfileEdit } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  const userContext = useContext(UserContext);
  const {
    user,
    isLoading,
    getUserByUid,
    getUserProfileByUid,
    clearUser,
  } = userContext;

  useEffect(() => {
    if (user !== null) {
      getUserByUid(user);
      getUserProfileByUid(user);
    } else {
      clearUser();
    }
  }, [user, getUserByUid, getUserProfileByUid, clearUser]);

  return (
    <Router>
      <Header />
      <Container id='root-container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <ProtectedRoute
            isAuthed={!!user}
            isLoading={isLoading}
            path='/profile/:id'
            exact
          >
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute
            isAuthed={!!user}
            isLoading={isLoading}
            path='/profile/:id/edit'
            exact
          >
            <ProfileEdit />
          </ProtectedRoute>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
