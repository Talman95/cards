import React, { FC } from 'react';

import { Box } from '@mui/material';

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
    <Box
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <SearchBox />
      <ToggleButtonBox
        onAllPacksClick={onAllPacksClick}
        onMyPacksClick={onMyPacksClick}
      />
      <PacksDoubleSlider />
      <ResetSettings />
    </Box>
  );
};
