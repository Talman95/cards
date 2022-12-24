import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Search } from '../../../../components/Search/Search';
import { useActions } from '../../../../hooks/useActions';
import { selectors } from '../../../../store';

export const UsersSearch: FC = () => {
  const { setSearchUserName } = useActions();

  const userName = useSelector(selectors.usersSelectors.selectFilterUserName);

  return (
    <Box style={{ height: '62px', width: '300px' }}>
      <Typography variant="body2">Search user</Typography>
      <Search title={userName} setTitle={setSearchUserName} />
    </Box>
  );
};
