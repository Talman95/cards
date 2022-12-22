import React, { FC } from 'react';

import { Button, Stack } from '@mui/material';

type PropsType = {
  navigateBack: () => void;
  clickSave: () => void;
};

export const BottomNavigationButtons: FC<PropsType> = ({ navigateBack, clickSave }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '8px' }}
    >
      <Button
        variant="outlined"
        onClick={navigateBack}
        style={{ width: 150 }}
        size="small"
      >
        Cancel
      </Button>
      <Button variant="contained" onClick={clickSave} style={{ width: 150 }} size="small">
        Save
      </Button>
    </Stack>
  );
};
