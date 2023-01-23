import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Search } from '../../../../components';
import { useActions } from '../../../../hooks/useActions';
import { allUsersActions, usersSelectors } from '../../../../store';

export const UsersSearch: FC = () => {
  const { setSearchUserName } = useActions(allUsersActions);

  const userName = useSelector(usersSelectors.selectFilterUserName);

  return (
    <Box style={{ height: '62px', width: '300px' }}>
      <Typography variant="body2">Search user</Typography>
      <Search title={userName} setTitle={setSearchUserName} />
    </Box>
  );
};
