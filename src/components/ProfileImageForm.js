import React, { useRef } from 'react';
import { Image, Form, FormFile } from 'react-bootstrap';

export const ProfileImageForm = ({ id }) => {
  const fileUpload = useRef(null);

  const fileChange = (files) => {
    console.log(files);
    console.log(fileUpload.current.files);
  };

  return (
    <div className='profile-image'>
      <Image src='/assets/profile-placeholder.png' alt='profile' rounded />

      <Form.Group>
        <FormFile>
          <FormFile.Label>Upload your Profile Picture</FormFile.Label>
          <FormFile.Input
            id='profileUpload'
            accept='.png, .jpg'
            ref={fileUpload}
            onChange={(e) => fileChange(e.target.files)}
          />
        </FormFile>
      </Form.Group>
    </div>
  );
};
