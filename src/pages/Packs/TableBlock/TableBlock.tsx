import React, { ChangeEvent, FC, MouseEvent } from 'react';

import { Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { useSelector } from 'react-redux';

import { useActions } from '../../../hooks/useActions';
import { selectors } from '../../../store';

import { CustomPackRow } from './CustomPackRow/CustomPackRow';
import { TableHeader } from './TableHeader/TableHeader';

const FIVE_CARDS_PER_PAGE = 5;
const TEN_CARDS_PER_PAGE = 10;
const TWENTY_CARDS_PER_PAGE = 20;

export const TableBlock: FC = () => {
  const { setCurrentPage, setPageCount } = useActions();

  const cardPacksTotalCount = useSelector(
    selectors.packsSelectors.selectCardPacksTotalCount,
  );
  const page = useSelector(selectors.packsSelectors.selectPage);
  const pageCount = useSelector(selectors.packsSelectors.selectPageCount);
  const cardPacks = useSelector(selectors.packsSelectors.selectCardPacks);

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
