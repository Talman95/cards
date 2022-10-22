import React, {ChangeEvent, MouseEvent} from 'react';
import {Paper, Table, TableBody, TableContainer, TablePagination} from "@mui/material";
import {UsersTableRow} from "./UsersTableRow/UsersTableRow";
import {UsersTableHeader} from "./UsersTableHeader/UsersTableHeader";
import {useAppSelector} from "../../../hooks/hooks";
import {useActions} from "../../../hooks/useActions";

export const UsersTable = () => {
    const {setUsersPage, setUsersPageCount} = useActions()

    const users = useAppSelector(state => state.users.users)
    const usersTotalCount = useAppSelector(state => state.users.usersTotalCount)
    const page = useAppSelector(state => state.users.filter.page)
    const pageCount = useAppSelector(state => state.users.filter.pageCount)

    const handleChangePage = (e: MouseEvent<HTMLButtonElement> | null, page: number) => {
        setUsersPage(page + 1)
    }
    const handleChangeRowsPerPage = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUsersPageCount(Number(e.target.value))
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <UsersTableHeader/>
                <TableBody>
                    {users.map((u: any) => (
                        <UsersTableRow key={u._id} user={u}/>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component={'div'}
                count={usersTotalCount}
                rowsPerPage={pageCount}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}