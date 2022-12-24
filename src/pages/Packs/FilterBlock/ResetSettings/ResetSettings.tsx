import React, { FC, memo } from 'react';

import TuneIcon from '@mui/icons-material/Tune';
import { Box, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../hooks/useActions';
import { selectors } from '../../../../store';

export const ResetSettings: FC = memo(() => {
  const { setDefaultValues } = useActions();

  const status = useSelector(selectors.appSelectors.selectStatus);

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
