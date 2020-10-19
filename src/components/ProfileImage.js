import React from 'react';
import { Image } from 'react-bootstrap';

export const ProfileImage = ({ profileImageUrl }) => {
  return (
    <div className='profile-image'>
      <Image
        src={
          profileImageUrl
            ? profileImageUrl.url
            : '/assets/profile-placeholder.png'
        }
        alt='profile'
        rounded
      />
    </div>
  );
};
