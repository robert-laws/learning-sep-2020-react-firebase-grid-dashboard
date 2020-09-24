import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

export const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    try {
      console.log(data);
      reset();
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
