import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { Search } from '../../../../components/Search/Search';
import { useAppSelector } from '../../../../hooks/hooks';
import { useActions } from '../../../../hooks/useActions';

export const UsersSearch: FC = () => {
  const { setSearchUserName } = useActions();

  const userName = useAppSelector(state => state.users.filter.userName);

  return (
    <Box style={{ height: '62px', width: '300px' }}>
      <Typography variant="body2">Search user</Typography>
      <Search title={userName} setTitle={setSearchUserName} />
    </Box>
  );
};
