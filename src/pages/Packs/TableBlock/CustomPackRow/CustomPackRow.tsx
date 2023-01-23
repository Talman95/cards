import React, { FC, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { IconButton, Stack, TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import noImage from '../../../../assets/no-image.jpg';
import { modalType } from '../../../../enums/modalType';
import { useActions } from '../../../../hooks/useActions';
import { allModalActions, appSelectors, profileSelectors } from '../../../../store';
import { DeleteModalType, ShowUserModalType } from '../../../../store/slices/modalSlice';
import { PackType } from '../../../../types';

export const CustomPackRow: FC<{ pack: PackType }> = ({ pack }) => {
  const navigate = useNavigate();

  const { setModalOpen } = useActions(allModalActions);

  const [packCover, setPackCover] = useState(pack.deckCover);

  const user_id = useSelector(profileSelectors.selectProfile)?._id;
  const status = useSelector(appSelectors.selectStatus);

  const navigateToCardsList = (id: string): void => {
    if (status === 'loading') return;

    navigate(`/cards/${id}`);
  };

  const onUpdatePackClick = (): void => {
    setModalOpen({
      type: modalType.UPDATE_PACK,
      data: {
        _id: pack._id,
        name: pack.name,
        deckCover: pack.deckCover,
        isPrivate: pack.private,
      },
    });
  };

  const onDeletePackClick = (): void => {
    setModalOpen({
      type: modalType.DELETE_PACK,
      data: {
        id: pack._id,
        title: pack.name,
      } as DeleteModalType,
    });
  };

  const onShowUserModalClick = (): void => {
    if (status === 'loading') return;

    setModalOpen({
      type: modalType.SHOW_USER,
      data: {
        id: pack.user_id,
      } as ShowUserModalType,
    });
  };

  const onLearnPackClick = (id: string): void => {
    navigate(`/learn/${id}`);
  };
  const handleError = (): void => {
    setPackCover(noImage);
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
      <TableCell align="left">
        <img
          src={packCover || noImage}
          alt="deck cover"
          style={{ width: 50, height: 50 }}
          onError={handleError}
        />
      </TableCell>
      {pack.cardsCount !== 0 || user_id === pack.user_id ? (
        <TableCell
          component="th"
          scope="row"
          align="left"
          onClick={() => navigateToCardsList(pack._id)}
          style={{
            cursor: 'pointer',
            width: '240px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {pack.name}
        </TableCell>
      ) : (
        <TableCell
          component="th"
          scope="row"
          align="left"
          style={{
            width: '240px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {pack.name}
        </TableCell>
      )}
      <TableCell align="left">{pack.cardsCount}</TableCell>
      <TableCell align="left">{new Date(pack.updated).toLocaleString()}</TableCell>
      <TableCell
        component="th"
        scope="row"
        align="left"
        onClick={onShowUserModalClick}
        style={{
          cursor: 'pointer',
          width: '180px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {pack.user_name}
      </TableCell>
      <TableCell align="left">
        {user_id === pack.user_id ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              aria-label="learn"
              size="small"
              onClick={() => onLearnPackClick(pack._id)}
              disabled={pack.cardsCount === 0 || status === 'loading'}
            >
              <SchoolIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="update"
              size="small"
              onClick={onUpdatePackClick}
              disabled={status === 'loading'}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={onDeletePackClick}
              disabled={status === 'loading'}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => onLearnPackClick(pack._id)}
              disabled={pack.cardsCount === 0 || status === 'loading'}
            >
              <SchoolIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </TableCell>
    </TableRow>
  );
};
