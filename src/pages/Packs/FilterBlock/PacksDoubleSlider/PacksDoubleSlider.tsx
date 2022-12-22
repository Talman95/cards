import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { DoubleSlider } from '../../../../components/DoubleSlider/DoubleSlider';
import { useAppSelector } from '../../../../hooks/hooks';
import { useActions } from '../../../../hooks/useActions';

export const PacksDoubleSlider: FC = () => {
  const { setMinMaxPacksCount } = useActions();

  const min = useAppSelector(state => state.packs.minCardsCount);
  const max = useAppSelector(state => state.packs.maxCardsCount);
  const filterMin = useAppSelector(state => state.packs.filter.min);
  const filterMax = useAppSelector(state => state.packs.filter.max);
  const status = useAppSelector(state => state.app.status);

  return (
    <Box sx={{ height: '62px', width: '300px', display: 'grid' }}>
      <Typography variant="body2">Number of cards</Typography>
      <DoubleSlider
        minFromServer={min}
        maxFromServer={max}
        minFromFilter={filterMin}
        maxFromFilter={filterMax}
        setMinMaxCount={setMinMaxPacksCount}
        disabled={status === 'loading'}
      />
    </Box>
  );
};
