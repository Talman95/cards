import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { DoubleSlider } from '../../../../components/DoubleSlider/DoubleSlider';
import { useActions } from '../../../../hooks/useActions';
import { selectors } from '../../../../store';

export const UsersDoubleSlider: FC = () => {
  const { setMinMaxUsersCount } = useActions();

  const min = useSelector(selectors.usersSelectors.selectMinPublicCardPacksCount);
  const max = useSelector(selectors.usersSelectors.selectMaxPublicCardPacksCount);
  const minFilter = useSelector(selectors.usersSelectors.selectFilterMin);
  const maxFilter = useSelector(selectors.usersSelectors.selectFilterMax);
  const status = useSelector(selectors.appSelectors.selectStatus);

  return (
    <Box sx={{ height: '62px', width: '300px', display: 'grid' }}>
      <Typography variant="body2">Number of public packs</Typography>
      <DoubleSlider
        minFromServer={min}
        maxFromServer={max}
        minFromFilter={minFilter}
        maxFromFilter={maxFilter}
        setMinMaxCount={setMinMaxUsersCount}
        disabled={status === 'loading'}
      />
    </Box>
  );
};
