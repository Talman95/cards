import React, { FC } from 'react';

import { Box, styled } from '@mui/material';

import { UsersDoubleSlider } from './UsersDoubleSlider/UsersDoubleSlider';
import { UsersSearch } from './UsersSearch/UsersSearch';

export const UsersFilter: FC = () => {
  return (
    <FilterBox>
      <UsersSearch />
      <UsersDoubleSlider />
    </FilterBox>
  );
};

export const FilterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '25px',
  marginBottom: '30px',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
}));
