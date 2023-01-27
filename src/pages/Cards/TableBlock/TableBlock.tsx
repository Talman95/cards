import React, { ChangeEvent, FC, MouseEvent } from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { itemsPerPage } from '../../../enums/itemsPerPage';
import { useActions } from '../../../hooks/useActions';
import { allCardsActions, cardsSelectors } from '../../../store';

import { CustomCardRow } from './CustomCardRow/CustomCardRow';
import { TableHeader } from './TableHeader/TableHeader';

export const TableBlock: FC<{ length: number }> = ({ length }) => {
  const { setCurrentPageCards, setPageCountCards } = useActions(allCardsActions);

  const page = useSelector(cardsSelectors.selectPage);
  const pageCount = useSelector(cardsSelectors.selectPageCount);
  const cardsTotalCount = useSelector(cardsSelectors.selectCardsTotalCount);
  const isLoading = useSelector(cardsSelectors.selectIsLoading);
  const cards = useSelector(cardsSelectors.selectCards);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ): void => {
    const currentPage = page + 1;

    setCurrentPageCards(currentPage);
  };
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setPageCountCards(+event.target.value);
  };

  return (
    <TableContainer component={Paper} style={{ overflowX: 'scroll' }}>
      <Table style={{ minWidth: '900px' }}>
        <TableHeader />
        {length !== 0 && (
          <TableBody>
            {cards.map(c => (
              <CustomCardRow key={c._id} card={c} />
            ))}
          </TableBody>
        )}
      </Table>
      {length !== 0 && (
        <TablePagination
          rowsPerPageOptions={[
            itemsPerPage.DEFAULT,
            itemsPerPage.MIDDLE,
            itemsPerPage.LARGE,
          ]}
          component="div"
          count={cardsTotalCount}
          rowsPerPage={pageCount}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {length === 0 && !isLoading && (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40vh',
          }}
        >
          <Typography style={{ opacity: '0.6' }}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};
