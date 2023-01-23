import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Search } from '../../../../components';
import { useActions } from '../../../../hooks/useActions';
import { allPacksActions, packsSelectors } from '../../../../store';

export const SearchBox: FC = () => {
  const { setPackName } = useActions(allPacksActions);

  const packName = useSelector(packsSelectors.selectFilterPackName);

  const setSearchName = (searchName: string): void => {
    setPackName(searchName);
  };

  return (
    <Box style={{ height: '62px', width: '300px' }}>
      <Typography variant="body2">Search</Typography>
      <Search title={packName} setTitle={setSearchName} />
    </Box>
  );
};
