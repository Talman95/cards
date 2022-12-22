import React, { FC } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Avatar, TableCell, TableRow } from '@mui/material';
import { blue } from '@mui/material/colors';

import { modalType } from '../../../../enums/modalType';
import { useAppSelector } from '../../../../hooks/hooks';
import { useActions } from '../../../../hooks/useActions';
import { ShowUserModalType } from '../../../../store/slices/modalSlice';
import { UserType } from '../../../../types';

const BLUE_COLOR = 500;

export const UsersTableRow: FC<{ user: UserType }> = ({ user }) => {
  const { setModalOpen } = useActions();

  const status = useAppSelector(state => state.app.status);

  const onShowUserModalClick = (): void => {
    if (status === 'loading') return;

    setModalOpen({
      type: modalType.SHOW_USER,
      data: {
        id: user._id,
      } as ShowUserModalType,
    });
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
      <TableCell
        align="left"
        style={{ width: '100px', cursor: 'pointer' }}
        onClick={onShowUserModalClick}
      >
        <Avatar
          sx={{ width: 60, height: 60, bgcolor: blue[BLUE_COLOR] }}
          alt={user.name}
          src={user.avatar || ''}
        />
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="left"
        onClick={onShowUserModalClick}
        style={{
          cursor: 'pointer',
          maxWidth: '268px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {user.name}
      </TableCell>
      <TableCell align="left">{user.publicCardPacksCount}</TableCell>
      <TableCell align="left">{new Date(user.updated).toLocaleString()}</TableCell>
      <TableCell component="th" scope="row" align="left">
        {new Date(user.created).toLocaleString()}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="left"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {user.verified && <CheckCircleIcon fontSize="small" color="primary" />}
      </TableCell>
    </TableRow>
  );
};
