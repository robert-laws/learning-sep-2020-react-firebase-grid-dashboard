import React from 'react';
import './App.scss';
import './firebase/config';
import { Header } from './layout';
import { Home, Signup, Login, Profile } from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProfileRedirect from './router/ProfileRedirect';
import PrivateRoute from './router/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />
      <Container id='root-container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <ProfileRedirect path='/signup' component={Signup} />
          <ProfileRedirect path='/login' component={Login} />
          <PrivateRoute path='/profile/:id' component={Profile} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
