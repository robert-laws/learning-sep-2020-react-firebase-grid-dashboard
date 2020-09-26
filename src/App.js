import React, { useContext, useEffect } from 'react';
import './App.scss';
import './firebase/config';
import ProtectedRoute from './router/ProtectedRoute';
import UserContext from './context/user/userContext';
import { Header } from './layout';
import { Home, Signup, Login, Profile } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  const userContext = useContext(UserContext);
  const { user, isLoading, getUserByUid } = userContext;

  useEffect(() => {
    if (user !== null) {
      getUserByUid(user);
    } else {
      removeUser();
    }
  }, [getUserByUid, user]);

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
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
