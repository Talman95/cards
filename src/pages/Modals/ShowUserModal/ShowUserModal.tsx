import React, { FC, useEffect } from 'react';

import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useActions } from '../../../hooks/useActions';
import {
  allModalActions,
  allUsersActions,
  usersSelectors,
  modalSelectors,
} from '../../../store';
import { ShowUserModalType } from '../../../store/slices/modalSlice';

export const ShowUserModal: FC = () => {
  const { setModalClose } = useActions(allModalActions);
  const { getUserData, removeUsersData } = useActions(allUsersActions);

  const navigate = useNavigate();

  const user = useSelector(usersSelectors.selectViewedUser);
  const data = useSelector(modalSelectors.selectData) as ShowUserModalType;

  useEffect(() => {
    getUserData(data.id);

    return () => {
      removeUsersData();
    };
  }, []);

  const onDisplayUserPackClick = (): void => {
    navigate(`/packs?id=${data.id}`);
    setModalClose();
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar sx={{ width: 120, height: 120 }} alt={user.name} src={user.avatar || ''} />
      <Box>
        <Typography
          variant="h6"
          style={{
            textOverflow: 'ellipsis',
            maxWidth: '370px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {user.name}
        </Typography>
      </Box>
      <Typography color="text.secondary">Email: {user.email}</Typography>
      <Typography color="text.secondary">
        Created: {new Date(user.created).toLocaleString()}
        <Typography color="text.secondary">
          Last updated: {new Date(user.updated).toLocaleString()}
        </Typography>
      </Typography>
      <Typography color="text.secondary">
        Created public packs: {user.publicCardPacksCount}
      </Typography>
      <Button
        variant="outlined"
        onClick={onDisplayUserPackClick}
        disabled={user.publicCardPacksCount === 0}
      >
        Show public packs
      </Button>
    </Box>
  );
};
