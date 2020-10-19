import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../context/user/userContext';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const userContext = useContext(UserContext);
  const { user, userProfile, isAdmin, login } = userContext;

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const history = useHistory();

  useEffect(() => {
    if (userProfile) {
      if (isAdmin) {
        history.push('/users');
      } else {
        history.push(`/profile/${user}`);
      }
    }
  }, [user, isAdmin, userProfile, history]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
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
              <Card.Title>Login</Card.Title>
              <hr />
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    name='email'
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    ref={register}
                  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Login
                </Button>
                <Button
                  as={Link}
                  variant='secondary'
                  to='/signup'
                  style={{ marginLeft: '10px' }}
                >
                  Signup
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
