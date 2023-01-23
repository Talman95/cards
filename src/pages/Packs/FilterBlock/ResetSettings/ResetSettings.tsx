import React, { FC, memo } from 'react';

import TuneIcon from '@mui/icons-material/Tune';
import { Box, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../hooks/useActions';
import { allPacksActions, appSelectors } from '../../../../store';

export const ResetSettings: FC = memo(() => {
  const { setDefaultValues } = useActions(allPacksActions);

  const status = useSelector(appSelectors.selectStatus);

  const setDefaultValuesHandler = (): void => {
    setDefaultValues();
  };

  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <IconButton disabled={status === 'loading'} onClick={setDefaultValuesHandler}>
        <TuneIcon />
      </IconButton>
    </Box>
  );
});
