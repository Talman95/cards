import React, { FC } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { selectors } from '../../../../store';

type PropsType = {
  onMyPacksClick: () => void;
  onAllPacksClick: () => void;
};

export const ToggleButtonBox: FC<PropsType> = ({ onMyPacksClick, onAllPacksClick }) => {
  const status = useSelector(selectors.appSelectors.selectStatus);
  const id = useSelector(selectors.profileSelectors.selectProfile)?._id;
  const paramUserId = useSelector(selectors.packsSelectors.selectParamUserId);

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
