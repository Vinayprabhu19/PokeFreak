import React from 'react';
import { styled } from '@mui/system';

// Circular container styled component
const CircularContainer = styled('div')(({ backgroundImage }) => ({
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

// Inner image styled component
const InnerImage = styled('img')(({ brightness }) => ({
  width: '200px',
  height: '200px',
  objectFit: 'contain',
  filter: `brightness(${brightness}%)`, // Apply brightness from props
}));

const BrightnessController = ({ brightness = 100, innerImage, backgroundImage }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularContainer backgroundImage={backgroundImage}>
        <InnerImage src={innerImage} brightness={brightness} alt="Inner" />
      </CircularContainer>
    </div>
  );
};

export default BrightnessController;
