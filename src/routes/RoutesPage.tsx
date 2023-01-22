import React, { FC } from 'react';

import { Box, styled } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { path } from '../enums/path';
import { Forgot, Login, Register, SetPassword } from '../pages/Auth';
import { CardsList } from '../pages/Cards/CardsList';
import { LearnList } from '../pages/Learn/LearnList';
import { Packs } from '../pages/Packs/Packs';
import { Profile } from '../pages/Profile/Profile';
import { Users } from '../pages/Users/Users';

import { PrivateRoutes } from './PrivateRoutes';

export const RoutesPage: FC = () => {
  const routes = [
    { path: path.LOGIN, component: <Login /> },
    { path: path.REGISTER, component: <Register /> },
    { path: path.FORGOT_PASSWORD, component: <Forgot /> },
    { path: path.SET_NEW_PASSWORD, component: <SetPassword /> },
    { path: '*', component: <div>ERROR 404</div> },
  ];
  const protectedRoutes = [
    { path: path.PROFILE, component: <Profile /> },
    { path: path.PACKS, component: <Packs /> },
    { path: path.CARDS, component: <CardsList /> },
    { path: path.LEARN, component: <LearnList /> },
    { path: path.USERS, component: <Users /> },
  ];

  return (
    <PagesBox>
      <Routes>
        <Route path="/" element={<Navigate to={path.PROFILE} />} />

        {routes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}

        <Route element={<PrivateRoutes />}>
          {protectedRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      </Routes>
    </PagesBox>
  );
};

export const PagesBox = styled(Box)(({ theme }) => ({
  width: 'calc(100vw - 30px)',
  display: 'flex',
  justifyContent: 'center',
  margin: '10px auto',
  [theme.breakpoints.up('sm')]: {
    width: 'calc(100vw - 50px)',
    margin: '30px auto',
  },
  [theme.breakpoints.up('md')]: {
    width: 'calc(100vw - 100px)',
    margin: '30px auto',
  },
}));
