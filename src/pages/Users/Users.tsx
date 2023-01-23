import React, { FC, useEffect } from 'react';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import { useActions } from '../../hooks/useActions';
import { allUsersActions, usersSelectors } from '../../store';

import { UsersFilter } from './UsersFilter/UsersFilter';
import { UsersHeader } from './UsersHeader/UsersHeader';
import { UsersTable } from './UsersTable/UsersTable';

const Users: FC = () => {
  const { getUsers } = useActions(allUsersActions);

  const filter = useSelector(usersSelectors.selectUsersFilter);

  useEffect(() => {
    getUsers();
  }, [filter]);

  return (
    <Box style={{ width: '100%' }}>
      <UsersHeader />
      <UsersFilter />
      <UsersTable />
    </Box>
  );
};

export default Users;
