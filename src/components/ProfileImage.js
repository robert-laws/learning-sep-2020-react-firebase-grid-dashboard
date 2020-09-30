import React from 'react';
import { Image } from 'react-bootstrap';

export const ProfileImage = () => {
  return (
    <div className='profile-image'>
      <Image src='/assets/profile-placeholder.png' alt='profile' rounded />
    </div>
  );
};
