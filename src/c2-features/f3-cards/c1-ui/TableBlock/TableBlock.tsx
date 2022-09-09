import React, {ChangeEvent, FC, MouseEvent} from 'react';
import {Paper, Table, TableContainer, TablePagination} from "@mui/material";
import {TableInfo} from "./TableInfo/TableInfo";
import {setCurrentPageCards, setPageCountCards} from "../../c2-bll/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {TableHeader} from "./TableHeader/TableHeader";

export const TableBlock: FC = () => {
    const dispatch = useAppDispatch()
    const {
        page,
        pageCount,
        cardsTotalCount,
    } = useAppSelector(state => state.cards)

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        const currentPage = page + 1
        dispatch(setCurrentPageCards(currentPage))
    }
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setPageCountCards(+event.target.value))
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
                count={cardsTotalCount}
                rowsPerPage={pageCount}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}