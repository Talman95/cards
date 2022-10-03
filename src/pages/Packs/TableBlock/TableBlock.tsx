import React, {ChangeEvent, FC, MouseEvent} from 'react';
import {Paper, Table, TableContainer, TablePagination} from "@mui/material";
import {TableInfo} from "./TableInfo/TableInfo";
import {setCurrentPage, setPageCount} from "../../../store/Packs/packsSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {TableHeader} from "./TableHeader/TableHeader";

export const TableBlock: FC = () => {
    const dispatch = useAppDispatch()
    const {
        cardPacksTotalCount,
        page,
        pageCount,
    } = useAppSelector(state => state.packs)

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        const currentPage = page + 1
        dispatch(setCurrentPage(currentPage))
    }
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setPageCount(+event.target.value))
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{width: 1000}} aria-label={'table'}>
                <TableHeader/>
                <TableInfo/>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component={'div'}
                count={cardPacksTotalCount}
                rowsPerPage={pageCount}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}