import React from 'react';
// import bgImage from '../../assets/img/login-bg.png'
import { Box, Container } from '@mui/material';
import bgImage from '@Assets/img/login-bg.jpeg';

export default function LoginPage() {
  console.log(bgImage);
  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        filter: 'brightness(50%)',
        width: '100%',
        height: '100%'
      }}
    >
      LoginPage
    </Box>
  );
}
