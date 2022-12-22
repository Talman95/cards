import { ReactElement } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { path } from '../enums/path';
import { useAppSelector } from '../hooks/hooks';

export const PrivateRoutes = (): ReactElement => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={path.LOGIN} />;
};
