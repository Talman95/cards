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

import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';

import { CustomCardRow } from './CustomCardRow/CustomCardRow';
import { TableHeader } from './TableHeader/TableHeader';

const FIVE_CARDS_PER_PAGE = 5;
const TEN_CARDS_PER_PAGE = 10;
const TWENTY_CARDS_PER_PAGE = 20;

export const TableBlock: FC<{ length: number }> = ({ length }) => {
  const { setCurrentPageCards, setPageCountCards } = useActions();

  const page = useAppSelector(state => state.cards.page);
  const pageCount = useAppSelector(state => state.cards.pageCount);
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount);
  const isLoading = useAppSelector(state => state.cards.isLoading);
  const cards = useAppSelector(state => state.cards.cards);

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
    <TableContainer component={Paper}>
      <Table sx={{ width: 1000 }} aria-label="table">
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
            FIVE_CARDS_PER_PAGE,
            TEN_CARDS_PER_PAGE,
            TWENTY_CARDS_PER_PAGE,
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
