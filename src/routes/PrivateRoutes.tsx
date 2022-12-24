import { ReactElement } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { path } from '../enums/path';
import { selectors } from '../store';

export const PrivateRoutes = (): ReactElement => {
  const isLoggedIn = useSelector(selectors.authSelectors.selectIsLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to={path.LOGIN} />;
};
