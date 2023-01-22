import React, { FC } from 'react';

import { Box, styled } from '@mui/material';

import { PacksDoubleSlider } from './PacksDoubleSlider/PacksDoubleSlider';
import { ResetSettings } from './ResetSettings/ResetSettings';
import { SearchBox } from './SearchBox/SearchBox';
import { ToggleButtonBox } from './ToggleButtonBox/ToggleButtonBox';

type PropsType = {
  onMyPacksClick: () => void;
  onAllPacksClick: () => void;
};

export const FilterBlock: FC<PropsType> = ({ onMyPacksClick, onAllPacksClick }) => {
  return (
    <FilterBox>
      <SearchBox />
      <ToggleButtonBox
        onAllPacksClick={onAllPacksClick}
        onMyPacksClick={onMyPacksClick}
      />
      <PacksDoubleSlider />
      <ResetSettings />
    </FilterBox>
  );
};

export const FilterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '7px',
  marginBottom: '30px',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));
