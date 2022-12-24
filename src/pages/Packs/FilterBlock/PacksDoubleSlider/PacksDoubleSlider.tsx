import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { DoubleSlider } from '../../../../components/DoubleSlider/DoubleSlider';
import { useActions } from '../../../../hooks/useActions';
import { selectors } from '../../../../store';

export const PacksDoubleSlider: FC = () => {
  const { setMinMaxPacksCount } = useActions();

  const min = useSelector(selectors.packsSelectors.selectMinCardsCount);
  const max = useSelector(selectors.packsSelectors.selectMaxCardsCount);
  const filterMin = useSelector(selectors.packsSelectors.selectFilterMin);
  const filterMax = useSelector(selectors.packsSelectors.selectFilterMax);
  const status = useSelector(selectors.appSelectors.selectStatus);

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
