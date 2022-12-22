import React, { ChangeEvent, FC, MouseEvent } from 'react';

import { Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';

import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';

import { CustomPackRow } from './CustomPackRow/CustomPackRow';
import { TableHeader } from './TableHeader/TableHeader';

const FIVE_CARDS_PER_PAGE = 5;
const TEN_CARDS_PER_PAGE = 10;
const TWENTY_CARDS_PER_PAGE = 20;

export const TableBlock: FC = () => {
  const { setCurrentPage, setPageCount } = useActions();

  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const page = useAppSelector(state => state.packs.page);
  const pageCount = useAppSelector(state => state.packs.pageCount);
  const cardPacks = useAppSelector(state => state.packs.cardPacks);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ): void => {
    const currentPage = page + 1;

    setCurrentPage(currentPage);
  };
  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setPageCount(+event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 1070 }} aria-label="table">
        <TableHeader />
        <TableBody>
          {cardPacks.map(p => (
            <CustomPackRow key={p._id} pack={p} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[
          FIVE_CARDS_PER_PAGE,
          TEN_CARDS_PER_PAGE,
          TWENTY_CARDS_PER_PAGE,
        ]}
        component="div"
        count={cardPacksTotalCount}
        rowsPerPage={pageCount}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
