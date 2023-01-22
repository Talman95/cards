import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

export const UsersHeader: FC = () => {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
      }}
    >
      <Typography variant="h6">Users</Typography>
    </Box>
  );
};
