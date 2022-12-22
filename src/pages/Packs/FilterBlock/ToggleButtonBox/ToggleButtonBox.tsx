import React, { FC } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../../../hooks/hooks';

type PropsType = {
  onMyPacksClick: () => void;
  onAllPacksClick: () => void;
};

export const ToggleButtonBox: FC<PropsType> = ({ onMyPacksClick, onAllPacksClick }) => {
  const status = useAppSelector(state => state.app.status);
  const id = useAppSelector(state => state.profile.profile?._id);
  const paramUserId = useAppSelector(state => state.packs.paramUserId);

  return (
    <Box style={{ height: '62px', display: 'grid' }}>
      <Typography variant="body2">Show packs cards</Typography>
      <Stack spacing={2} direction="row">
        <Button
          variant={id === paramUserId ? 'contained' : 'outlined'}
          style={{ width: '80px' }}
          onClick={onMyPacksClick}
          size="small"
          disabled={status === 'loading'}
        >
          My
        </Button>
        <Button
          variant={paramUserId === null ? 'contained' : 'outlined'}
          style={{ width: '80px' }}
          onClick={onAllPacksClick}
          size="small"
          disabled={status === 'loading'}
        >
          All
        </Button>
      </Stack>
    </Box>
  );
};
