import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { DoubleSlider } from '../../../../components';
import { useActions } from '../../../../hooks/useActions';
import { allUsersActions, appSelectors, usersSelectors } from '../../../../store';

export const UsersDoubleSlider: FC = () => {
  const { setMinMaxUsersCount } = useActions(allUsersActions);

  const min = useSelector(usersSelectors.selectMinPublicCardPacksCount);
  const max = useSelector(usersSelectors.selectMaxPublicCardPacksCount);
  const minFilter = useSelector(usersSelectors.selectFilterMin);
  const maxFilter = useSelector(usersSelectors.selectFilterMax);
  const status = useSelector(appSelectors.selectStatus);

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
