import React, { FC, useEffect } from 'react';

import { Avatar, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';
import { ShowUserModalType } from '../../../store/Modal/modalSlice';

export const ShowUserModal: FC = () => {
  const { getUserData, removeUsersData, setModalClose } = useActions();

  const navigate = useNavigate();

  const user = useAppSelector(state => state.users.viewedUser);
  const data = useAppSelector(state => state.modal.data) as ShowUserModalType;

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
