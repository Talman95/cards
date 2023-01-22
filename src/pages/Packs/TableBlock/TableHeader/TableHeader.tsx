import React, { FC, useState } from 'react';

import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { visuallyHidden } from '@mui/utils';

import { useActions } from '../../../../hooks/useActions';

type Order = 'asc' | 'desc';
type Data = 'cardsCount' | 'updated';

export const TableHeader: FC = () => {
  const { setSortPacks } = useActions();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<Data>('updated');

  const sortHandler = (order: Order, orderBy: Data): void => {
    const direction = order === 'asc' ? 0 : 1;
    const str = direction + orderBy;

    setOrder(order);
    setOrderBy(orderBy);
    setSortPacks(str);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">Cover</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">
          <TableSortLabel
            active={orderBy === 'cardsCount'}
            direction={orderBy === 'cardsCount' ? order : 'asc'}
            onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'cardsCount')}
          >
            Cards
            {orderBy === 'cardsCount' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell align="left">
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
        <TableCell align="left">Created by</TableCell>
        <TableCell align="left">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};
