import React, { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { modalType } from '../../../enums/modalType';
import { useActions } from '../../../hooks/useActions';
import { selectors } from '../../../store';

export const PackListHeader: FC = () => {
  const { setModalOpen } = useActions();

  const status = useSelector(selectors.appSelectors.selectStatus);

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
