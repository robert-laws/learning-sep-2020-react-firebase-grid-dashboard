import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { login } from '../firebase/auth';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    let user;
    try {
      user = await login(data);
      reset();
      history.push(`/profile/${user.uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col md={2}></Col>
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
      <Col md={2}></Col>
    </Row>
  );
};
