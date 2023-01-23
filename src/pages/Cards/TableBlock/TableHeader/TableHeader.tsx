import React, { FC, useState } from 'react';

import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { visuallyHidden } from '@mui/utils';
import { useSelector } from 'react-redux';

import { useActions } from '../../../../hooks/useActions';
import { allCardsActions, cardsSelectors, profileSelectors } from '../../../../store';

type Order = 'asc' | 'desc';
type Data = 'grade' | 'updated';

export const TableHeader: FC = () => {
  const { setSortCards } = useActions(allCardsActions);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<Data>('updated');

  const packUserId = useSelector(cardsSelectors.selectPackUserId);
  const userId = useSelector(profileSelectors.selectProfile)?._id;

  const sortHandler = (order: Order, orderBy: Data): void => {
    const direction = order === 'asc' ? 0 : 1;
    const str = direction + orderBy;

    setOrder(order);
    setOrderBy(orderBy);
    setSortCards(str);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" style={{ minWidth: '261px', maxWidth: '268px' }}>
          Question
        </TableCell>
        <TableCell align="left" style={{ minWidth: '261px', maxWidth: '268px' }}>
          Answer
        </TableCell>
        <TableCell align="left" style={{ width: '150px' }}>
          <TableSortLabel
            active={orderBy === 'updated'}
            direction={orderBy === 'updated' ? order : 'asc'}
            onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'updated')}
          >
            Last Updated
            {orderBy === 'updated' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell align="left" style={{ width: '100px' }}>
          <TableSortLabel
            active={orderBy === 'grade'}
            direction={orderBy === 'grade' ? order : 'asc'}
            onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'grade')}
          >
            Grade
            {orderBy === 'grade' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        {userId === packUserId && (
          <TableCell align="left" style={{ minWidth: '68px', maxWidth: '68px' }}>
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
