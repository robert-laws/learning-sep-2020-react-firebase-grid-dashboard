import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';

export const Header = () => {
  const userContext = useContext(UserContext);
  const { user, userProfile, logout } = userContext;

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
        {!!user && (
          <Nav.Link as={NavLink} exact to={`/profile/${user}`}>
            Profile
          </Nav.Link>
        )}
      </Nav>
      {!user && (
        <Nav>
          <Button
            as={NavLink}
            variant='dark'
            className='justify-content-end'
            to='/signup'
          >
            Signup
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            as={NavLink}
            variant='dark'
            className='justify-content-end'
            to='/login'
          >
            Login
          </Button>
        </Nav>
      )}
      {!!user && (
        <Nav>
          {userProfile && (
            <h6 className='welcome-text'>Hello, {userProfile.firstName}</h6>
          )}
          <Nav.Link
            as={Button}
            onClick={logoutUser}
            variant='dark'
            className='justify-content-end'
          >
            Logout
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};
