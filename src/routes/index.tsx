import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import { ROUTE_NAMES } from './routeNames';

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.HOME} element={<HomePage />} />
      <Route path={ROUTE_NAMES.LOGIN} element={<LoginPage />} />
    </Routes>
  );
}
