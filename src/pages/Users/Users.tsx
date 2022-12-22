import React, { FC, useEffect } from 'react';

import { Box } from '@mui/material';

import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/useActions';

import { UsersFilter } from './UsersFilter/UsersFilter';
import { UsersHeader } from './UsersHeader/UsersHeader';
import { UsersTable } from './UsersTable/UsersTable';

export const Users: FC = () => {
  const { getUsers } = useActions();

  const filter = useAppSelector(state => state.users.filter);

  useEffect(() => {
    getUsers();
  }, [filter]);

  return (
    <Box>
      <UsersHeader />
      <UsersFilter />
      <UsersTable />
    </Box>
  );
};
