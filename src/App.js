import React from 'react';
import './App.scss';
import './firebase/config';
import { Container } from 'semantic-ui-react';
import { Signup } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
