import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { Search } from '../../../../components/Search/Search';
import { useAppSelector } from '../../../../hooks/hooks';
import { useActions } from '../../../../hooks/useActions';

export const SearchBox: FC = () => {
  const { setPackName } = useActions();

  const packName = useAppSelector(state => state.packs.filter.packName);

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
