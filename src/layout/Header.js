import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export const Header = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar>
        <Navbar.Brand as={Link} to='/'>
          Grid Dashboard App
        </Navbar.Brand>
        <Nav>
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
      </Navbar>
    </Navbar>
  );
};
