import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import UserContext from '../context/user/userContext';

export const ProfileEdit = () => {
  const userContext = useContext(UserContext);
  const { userProfile } = userContext;

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { id } = useParams();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // await login(data);
      reset();
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
              <Card.Title>Edit Profile</Card.Title>
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
