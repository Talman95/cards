import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { DoubleSlider } from '../../../../components';
import { useActions } from '../../../../hooks/useActions';
import { allPacksActions, appSelectors, packsSelectors } from '../../../../store';

export const PacksDoubleSlider: FC = () => {
  const { setMinMaxPacksCount } = useActions(allPacksActions);

  const min = useSelector(packsSelectors.selectMinCardsCount);
  const max = useSelector(packsSelectors.selectMaxCardsCount);
  const filterMin = useSelector(packsSelectors.selectFilterMin);
  const filterMax = useSelector(packsSelectors.selectFilterMax);
  const status = useSelector(appSelectors.selectStatus);

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
