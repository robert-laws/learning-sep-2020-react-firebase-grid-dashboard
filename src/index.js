import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import UserState from './context/user/UserState';
import UsersState from './context/users/UsersState';

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <UsersState>
        <App />
      </UsersState>
    </UserState>
  </React.StrictMode>,
  document.getElementById('root')
);
