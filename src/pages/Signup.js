import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/user/userContext';

export const Signup = () => {
  const userContext = useContext(UserContext);
  const { user, userProfile, signup, createUser } = userContext;

  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  useEffect(() => {
    if (userProfile) {
      history.push(`/profile/${user}`);
    }
  }, [userProfile, user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const uid = await signup(newUser.email, newUser.password);
      await createUser(uid, newUser.firstName, newUser.lastName, newUser.email);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col md={2}></Col>
      {loading ? (
        <Col
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
          }}
        >
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </Col>
      ) : (
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Signup</Card.Title>
              <hr />
              <Form onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      placeholder='First Name'
                      value={newUser.firstName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, firstName: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      placeholder='Last Name'
                      value={newUser.lastName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, lastName: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Signup
                </Button>
                <Button
                  as={Link}
                  variant='secondary'
                  to='/login'
                  style={{ marginLeft: '10px' }}
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      )}
      <Col md={2}></Col>
    </Row>
  );
};
