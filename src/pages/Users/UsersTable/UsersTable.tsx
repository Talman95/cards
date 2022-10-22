import React from 'react';
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import {UsersTableRow} from "./UsersTableRow/UsersTableRow";
import {UsersTableHeader} from "./UsersTableHeader/UsersTableHeader";
import {useAppSelector} from "../../../hooks/hooks";

export const UsersTable = () => {
    const users = useAppSelector(state => state.users.users)

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
        </TableContainer>
    )
}