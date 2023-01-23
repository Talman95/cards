import { ReactElement } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { path } from '../enums/path';
import { authSelectors } from '../store';

export const PrivateRoutes = (): ReactElement => {
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={path.LOGIN} />;
};
