import React, { ChangeEvent, FC, MouseEvent } from 'react';

import { Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { useSelector } from 'react-redux';

import { itemsPerPage } from '../../../enums/itemsPerPage';
import { useActions } from '../../../hooks/useActions';
import { allPacksActions, packsSelectors } from '../../../store';

import { CustomPackRow } from './CustomPackRow/CustomPackRow';
import { TableHeader } from './TableHeader/TableHeader';

export const TableBlock: FC = () => {
  const { setCurrentPage, setPageCount } = useActions(allPacksActions);

  const cardPacksTotalCount = useSelector(packsSelectors.selectCardPacksTotalCount);
  const page = useSelector(packsSelectors.selectPage);
  const pageCount = useSelector(packsSelectors.selectPageCount);
  const cardPacks = useSelector(packsSelectors.selectCardPacks);

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
    <TableContainer component={Paper} style={{ overflowX: 'scroll' }}>
      <Table style={{ minWidth: '900px' }}>
        <TableHeader />
        <TableBody>
          {cardPacks.map(p => (
            <CustomPackRow key={p._id} pack={p} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[
          itemsPerPage.DEFAULT,
          itemsPerPage.MIDDLE,
          itemsPerPage.LARGE,
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
