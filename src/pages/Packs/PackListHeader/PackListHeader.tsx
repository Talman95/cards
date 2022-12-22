import React, { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { modalType } from '../../../enums/modalType';
import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';

export const PackListHeader: FC = () => {
  const { setModalOpen } = useActions();

  const status = useAppSelector(state => state.app.status);

  const onAddPackClick = (): void => {
    setModalOpen({
      type: modalType.ADD_PACK,
      data: {
        name: '',
        deckCover: null,
        isPrivate: false,
      },
    });
  };

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}
    >
      <Typography variant="h6">Packs list</Typography>
      <Button
        variant="contained"
        onClick={onAddPackClick}
        disabled={status === 'loading'}
      >
        Add new pack
      </Button>
    </Box>
  );
};
