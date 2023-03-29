import { Box, Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginContext from './contexts/loginContext';
import { useAuth } from './hooks';
import Router from './routes';

import { ROUTE_NAMES } from './routes/routeNames';
import { User } from './types';

function App() {
  console.log(window.ipcRenderer);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (!user.isAuth) {
      navigate(ROUTE_NAMES.LOGIN);
    }
  }, [user]);

  console.log(location.pathname)

  return (
    <LoginContext value={{ user }}>
      <Router />
    </LoginContext>
  );
}

export default App;
