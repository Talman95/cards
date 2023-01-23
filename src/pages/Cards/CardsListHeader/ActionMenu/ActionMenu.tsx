import React, { FC } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { IconButton, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { cardsSelectors } from '../../../../store';

type PropsType = {
  blocked: boolean;
  showUpdateModal: () => void;
  showDeleteModal: () => void;
  closeTooltip: () => void;
};

export const ActionMenu: FC<PropsType> = ({
  blocked,
  showUpdateModal,
  showDeleteModal,
  closeTooltip,
}) => {
  const navigate = useNavigate();

  const cardsPack_id = useSelector(cardsSelectors.selectCardsPack_id);

  const onLearnPackClick = (): void => {
    closeTooltip();
    navigate(`/learn/${cardsPack_id}`);
  };
  const onUpdatePackClick = (): void => {
    closeTooltip();
    showUpdateModal();
  };
  const onDeletePackClick = (): void => {
    closeTooltip();
    showDeleteModal();
  };

  return (
    <Stack direction="column" alignItems="flex-start" justifyContent="center" spacing={1}>
      <IconButton size="small" onClick={onLearnPackClick} disabled={blocked}>
        <SchoolIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={onUpdatePackClick}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={onDeletePackClick}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};
