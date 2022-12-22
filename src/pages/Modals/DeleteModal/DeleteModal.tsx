import React, { FC } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { modalType } from '../../../enums/modalType';
import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';
import { DeleteModalType } from '../../../store/slices/modalSlice';

export const DeleteModal: FC = () => {
  const { setModalClose, deletePack, deleteCard } = useActions();

  const type = useAppSelector(state => state.modal.type);
  const data = useAppSelector(state => state.modal.data) as DeleteModalType;

  const onDeleteButtonClick = (): void => {
    if (type === modalType.DELETE_PACK) {
      deletePack(data.id);
    }

    if (type === modalType.DELETE_CARD) {
      deleteCard(data.id);
    }

    setModalClose();
  };

  const onCloseButtonClick = (): void => {
    setModalClose();
  };

  return (
    <>
      <Typography>
        Do you really want to remove <strong>{data.title}</strong>?
      </Typography>
      <Typography>All cards will be deleted.</Typography>
      <Stack
        direction="row"
        spacing={2}
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <Button
          variant="outlined"
          onClick={onCloseButtonClick}
          style={{ width: 150, height: 55 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onDeleteButtonClick}
          style={{ width: 150, height: 55 }}
        >
          Delete
        </Button>
      </Stack>
    </>
  );
};
