import React from 'react';
import './App.scss';
import './firebase/config';
import { Header } from './layout';
import { Home, Signup, Login, Profile } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <Container id='root-container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
