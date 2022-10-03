import React, {ChangeEvent, FC, MouseEvent} from 'react';
import {Paper, Table, TableContainer, TablePagination} from "@mui/material";
import {TableInfo} from "./TableInfo/TableInfo";
import {useAppSelector} from "../../../hooks/hooks";
import {TableHeader} from "./TableHeader/TableHeader";
import {useActions} from "../../../hooks/useActions";

export const TableBlock: FC = () => {
    const {setCurrentPage, setPageCount} = useActions()

    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.page)
    const pageCount = useAppSelector(state => state.packs.pageCount)

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        const currentPage = page + 1
        setCurrentPage(currentPage)
    }
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPageCount(+event.target.value)
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
    )
}