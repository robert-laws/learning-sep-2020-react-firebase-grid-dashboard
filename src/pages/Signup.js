import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

export const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <Row>
      <Col md={2}></Col>
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
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder='Last Name'
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
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
