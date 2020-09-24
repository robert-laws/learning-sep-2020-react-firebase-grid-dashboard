import React from 'react';
import './App.scss';
import './firebase/config';
import { Header } from './layout';
import { Home, Signup } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
