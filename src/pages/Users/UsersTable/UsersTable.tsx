import React, { ChangeEvent, FC, MouseEvent } from 'react';

import { Paper, Table, TableBody, TableContainer, TablePagination } from '@mui/material';

import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';

import { UsersTableHeader } from './UsersTableHeader/UsersTableHeader';
import { UsersTableRow } from './UsersTableRow/UsersTableRow';

const FIVE_CARDS_PER_PAGE = 5;
const TEN_CARDS_PER_PAGE = 10;
const TWENTY_CARDS_PER_PAGE = 20;

export const UsersTable: FC = () => {
  const { setUsersPage, setUsersPageCount } = useActions();

  const users = useAppSelector(state => state.users.users);
  const usersTotalCount = useAppSelector(state => state.users.usersTotalCount);
  const page = useAppSelector(state => state.users.filter.page);
  const pageCount = useAppSelector(state => state.users.filter.pageCount);

  const handleChangePage = (
    e: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ): void => {
    setUsersPage(page + 1);
  };
  const handleChangeRowsPerPage = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setUsersPageCount(Number(e.target.value));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <UsersTableHeader />
        <TableBody>
          {users.map(u => (
            <UsersTableRow key={u._id} user={u} />
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
        count={usersTotalCount}
        rowsPerPage={pageCount}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
