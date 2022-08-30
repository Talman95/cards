import React, {ChangeEvent, FC, MouseEvent, useEffect} from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {getPacks, setCurrentPage, setPageCount} from "../p2-bll/packsReducer";
import {Navigate} from "react-router-dom";

export const PacksList: FC = () => {
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const currentPage = useAppSelector(state => state.packs.page)
    const rowsPerPage = useAppSelector(state => state.packs.pageCount)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        dispatch(setCurrentPage(page))
    }
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setPageCount(+event.currentTarget.value))
    }

    useEffect(() => {
        dispatch(getPacks({pageCount: 10}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Cards</TableCell>
                            <TableCell align="right">Last Updated</TableCell>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((p) => (
                            <TableRow
                                key={p.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {p.name}
                                </TableCell>
                                <TableCell align="right">{p.cardsCount}</TableCell>
                                <TableCell align="right">{p.updated}</TableCell>
                                <TableCell align="right">{p.created}</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};