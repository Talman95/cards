import React, { FC } from 'react';

import { Box, styled } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { path } from '../enums/path';
import { withSuspense } from '../hoc/withSuspense';
import { Login } from '../pages/Auth/Login/Login';
import Profile from '../pages/Profile/Profile';

import { PrivateRoutes } from './PrivateRoutes';

const Register = React.lazy(() => import('../pages/Auth/Register/Register'));
const Forgot = React.lazy(() => import('../pages/Auth/Forgot/Forgot'));
const SetPassword = React.lazy(() => import('../pages/Auth/SetPassword/SetPassword'));
const Packs = React.lazy(() => import('../pages/Packs/Packs'));
const Cards = React.lazy(() => import('../pages/Cards/CardsList'));
const Learn = React.lazy(() => import('../pages/Learn/LearnList'));
const Users = React.lazy(() => import('../pages/Users/Users'));

const RegisterSuspense = withSuspense(Register);
const ForgotSuspense = withSuspense(Forgot);
const SetPasswordSuspense = withSuspense(SetPassword);
const PacksSuspense = withSuspense(Packs);
const CardsSuspense = withSuspense(Cards);
const LearnSuspense = withSuspense(Learn);
const UsersSuspense = withSuspense(Users);

export const RoutesPage: FC = () => {
  const routes = [
    { path: path.LOGIN, component: <Login /> },
    { path: path.REGISTER, component: <RegisterSuspense /> },
    { path: path.FORGOT_PASSWORD, component: <ForgotSuspense /> },
    { path: path.SET_NEW_PASSWORD, component: <SetPasswordSuspense /> },
    { path: '*', component: <div>ERROR 404</div> },
  ];

  const protectedRoutes = [
    { path: path.PROFILE, component: <Profile /> },
    { path: path.PACKS, component: <PacksSuspense /> },
    { path: path.CARDS, component: <CardsSuspense /> },
    { path: path.LEARN, component: <LearnSuspense /> },
    { path: path.USERS, component: <UsersSuspense /> },
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

const PagesBox = styled(Box)(({ theme }) => ({
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
