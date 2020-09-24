import React, { useContext } from 'react';
import { logout } from '../firebase/auth';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';

export const Header = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const history = useHistory();

  const logoutUser = async () => {
    await logout();
    history.push('/login');
  };

  return (
    <Navbar className='justify-content-between' bg='dark' variant='dark'>
      <Nav className='mr-auto'>
        <Navbar.Brand as={Link} to='/'>
          Grid Dashboard App
        </Navbar.Brand>
        <Nav.Link as={NavLink} exact to='/'>
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to='/signup'>
          Signup
        </Nav.Link>
        <Nav.Link as={NavLink} to='/login'>
          Login
        </Nav.Link>
      </Nav>
      {!!user && (
        <Nav.Link
          as={Button}
          onClick={logoutUser}
          variant='dark'
          className='justify-content-end'
        >
          Logout
        </Nav.Link>
      )}
    </Navbar>
  );
};
