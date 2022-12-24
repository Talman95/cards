import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Search } from '../../../../components/Search/Search';
import { useActions } from '../../../../hooks/useActions';
import { selectors } from '../../../../store';

export const SearchBox: FC = () => {
  const { setPackName } = useActions();

  const packName = useSelector(selectors.packsSelectors.selectFilterPackName);

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
