import React, { FC } from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { modalType } from '../../../enums/modalType';
import { useActions } from '../../../hooks/useActions';
import {
  allCardsActions,
  allModalActions,
  allPacksActions,
  modalSelectors,
} from '../../../store';
import { DeleteModalType } from '../../../store/slices/modalSlice';

export const DeleteModal: FC = () => {
  const { setModalClose } = useActions(allModalActions);
  const { deletePack } = useActions(allPacksActions);
  const { deleteCard } = useActions(allCardsActions);

  const type = useSelector(modalSelectors.selectType);
  const data = useSelector(modalSelectors.selectData) as DeleteModalType;

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
