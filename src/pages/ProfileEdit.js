import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import UserContext from '../context/user/userContext';
import { ProfileImageForm } from '../components/ProfileImageForm';

export const ProfileEdit = () => {
  const userContext = useContext(UserContext);
  const { userProfile, updateUserProfile } = userContext;

  const [loading, setLoading] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    if (userProfile) {
      Object.entries(userProfile).map((item) => setValue(item[0], item[1]));
    }
  }, [userProfile, setValue]);

  useEffect(() => {
    if (updateComplete) {
      history.push(`/profile/${id}`);
    }
  }, [updateComplete, history, id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUserProfile(id, data);
      reset();
      setUpdateComplete(true);
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
              <Card.Title>Edit Profile</Card.Title>
              <hr />
              <Form onSubmit={handleSubmit(onSubmit)}>
                <ProfileImageForm id={id} />
                <Form.Group controlId='firstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='firstName'
                    name='firstName'
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='lastName'
                    name='lastName'
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' name='email' ref={register} />
                </Form.Group>
                <Form.Group controlId='phone'>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type='phone' name='phone' ref={register} />
                </Form.Group>
                <Form.Group controlId='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type='address' name='address' ref={register} />
                </Form.Group>
                <Form.Group controlId='city'>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='city' name='city' ref={register} />
                </Form.Group>
                <Form.Group controlId='state'>
                  <Form.Label>State</Form.Label>
                  <Form.Control type='state' name='state' ref={register} />
                </Form.Group>
                <Form.Group controlId='zip'>
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type='zip' name='zip' ref={register} />
                </Form.Group>
                <Form.Group controlId='specialty'>
                  <Form.Label>Specialty</Form.Label>
                  <Form.Control
                    type='specialty'
                    name='specialty'
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId='ip'>
                  <Form.Label>IP Address</Form.Label>
                  <Form.Control type='ip' name='ip' ref={register} />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Update Profile
                </Button>
                <Button
                  as={Link}
                  variant='secondary'
                  to={`/profile/${id}`}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
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
