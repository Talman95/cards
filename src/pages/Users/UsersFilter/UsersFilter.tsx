import React, { FC } from 'react';

import { Box } from '@mui/material';

import { UsersDoubleSlider } from './UsersDoubleSlider/UsersDoubleSlider';
import { UsersSearch } from './UsersSearch/UsersSearch';

export const UsersFilter: FC = () => {
  return (
    <Box
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <UsersSearch />
      <UsersDoubleSlider />
    </Box>
  );
};
