import React, { FC } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Rating,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { UpdateCardType } from '../../../../api';
import { modalType } from '../../../../enums/modalType';
import { useActions } from '../../../../hooks/useActions';
import { selectors } from '../../../../store';
import { DeleteModalType } from '../../../../store/slices/modalSlice';
import { CardType } from '../../../../types';

export const CustomCardRow: FC<{ card: CardType }> = ({ card }) => {
  const { setModalOpen } = useActions();

  const userId = useSelector(selectors.profileSelectors.selectProfile)?._id;

  const onUpdateCardClick = (): void => {
    setModalOpen({
      type: modalType.UPDATE_CARD,
      data: {
        _id: card._id,
        question: card.question,
        answer: card.answer,
        questionImg: card.questionImg,
        answerImg: card.answerImg,
      } as UpdateCardType,
    });
  };

  const onDeleteCardClick = (): void => {
    setModalOpen({
      type: modalType.DELETE_CARD,
      data: {
        id: card._id,
        title: card.question,
      } as DeleteModalType,
    });
  };

  return (
    <TableRow
      key={card._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      hover
    >
      <TableCell
        component="th"
        scope="row"
        align="left"
        style={{ width: '261px', overflowWrap: 'anywhere' }}
      >
        {card.questionImg && (
          <img
            src={card.questionImg}
            alt="question cover"
            style={{ maxWidth: 150, maxHeight: 150 }}
          />
        )}
        {card.question !== '' && card.question !== 'no question' && (
          <Typography>{card.question}</Typography>
        )}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="left"
        style={{ width: '261px', overflowWrap: 'anywhere' }}
      >
        {card.answerImg && (
          <img
            src={card.answerImg}
            alt="answer cover"
            style={{ maxWidth: 150, maxHeight: 150 }}
          />
        )}
        {card.answer !== '' && card.answer !== 'no answer' && (
          <Typography>{card.answer}</Typography>
        )}
      </TableCell>
      <TableCell align="left">{new Date(card.updated).toLocaleString()}</TableCell>
      <TableCell align="left">
        <Rating
          name="read-only"
          value={card.grade}
          readOnly
          size="small"
          precision={0.5}
        />
      </TableCell>
      {card.user_id === userId && (
        <TableCell align="left" style={{ width: '70px' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton aria-label="delete" size="small" onClick={onUpdateCardClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="delete" size="small" onClick={onDeleteCardClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </TableCell>
      )}
    </TableRow>
  );
};
