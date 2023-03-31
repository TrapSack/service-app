import React from 'react';
// import bgImage from '../../assets/img/login-bg.png'
import { Box, Container, Grow } from '@mui/material';
import bgImage from '@Assets/img/login-bg.jpeg';
import { Button, Input } from '@Components/';

export default function LoginPage() {
  console.log(bgImage);
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          filter: 'brightness(50%)',
          width: '100%',
          height: '100%'
        }}
      />
      <Grow in>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '0',
            left: '0',
            margin: 'auto',
            width: '100%',
            height: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              padding: '65px 32px',
              backgroundColor: '#181818',
              width: '390px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: '#fff',
                fontWeight: '400',
                letterSpacing: '5px'
              }}
            >
              Login
            </Box>
            <Input name="login" onChange={() => null} placeholder="Login" value="" type="text" />
            <Input name="login" onChange={() => null} placeholder="Password" value="" type="text" />
            <Button>Sign in</Button>
          </Box>
        </Box>
      </Grow>
    </>
  );
}
