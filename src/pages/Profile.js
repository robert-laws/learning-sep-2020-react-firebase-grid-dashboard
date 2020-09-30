import React, { useContext } from 'react';
import { Redirect, useParams, Link } from 'react-router-dom';
import UserContext from '../context/user/userContext';
import { Button, Row, Col } from 'react-bootstrap';
import { ProfileImage } from '../components';

export const Profile = () => {
  const userContext = useContext(UserContext);
  const { user, userProfile } = userContext;

  const { id } = useParams();

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  if (id !== user) {
    return <Redirect to={`/profile/${user}`} />;
  }

  return (
    <Row>
      <Col>
        <ProfileImage />
        <p>
          Name: {userProfile.firstName} {userProfile.lastName}
        </p>
        <p>Email: {userProfile.email}</p>
        <p>Phone: {userProfile.phone}</p>
        <p>Address: {userProfile.address}</p>
        <p>City: {userProfile.city}</p>
        <p>State: {userProfile.state}</p>
        <p>Zip: {userProfile.zip}</p>
        <p>Specialty: {userProfile.specialty}</p>
        <p>IP: {userProfile.ip}</p>
        <hr />
        <Button as={Link} to={`/profile/${id}/edit`}>
          Edit Profile
        </Button>
      </Col>
    </Row>
  );
};
