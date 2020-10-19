import React, { useState, useContext } from 'react';
import { Spinner, Image, Form, FormFile } from 'react-bootstrap';
import UserContext from '../context/user/userContext';

export const ProfileImageForm = ({ id, profileImageUrl }) => {
  const userContext = useContext(UserContext);
  const { uploadUserImage } = userContext;

  const [loading, setLoading] = useState(false);

  // const fileUpload = useRef(null);

  const fileChange = async (files) => {
    setLoading(true);
    try {
      await uploadUserImage(id, files[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profile-image'>
      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      ) : (
        <Image
          src={
            profileImageUrl
              ? profileImageUrl.url
              : '/assets/profile-placeholder.png'
          }
          alt='profile'
          rounded
        />
      )}

      <Form.Group>
        <FormFile>
          <FormFile.Label>Upload your Profile Picture</FormFile.Label>
          <FormFile.Input
            id='profileUpload'
            accept='.png, .jpg'
            onChange={(e) => fileChange(e.target.files)}
          />
        </FormFile>
      </Form.Group>
    </div>
  );
};
