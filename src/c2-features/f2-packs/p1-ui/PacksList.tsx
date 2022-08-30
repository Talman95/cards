import React, {ChangeEvent, FC, MouseEvent, useEffect} from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {getPacks, setCurrentPage, setPageCount} from "../p2-bll/packsReducer";
import {Navigate} from "react-router-dom";
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";

export const PacksList: FC = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const {
        cardPacks,
        cardPacksTotalCount,
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        showPacks,
    } = useAppSelector(state => state.packs)

    const dispatch = useAppDispatch()

    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        const currentPage = page + 1
        dispatch(setCurrentPage(currentPage))
    }
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setPageCount(+event.target.value))
    }

    useEffect(() => {
        dispatch(getPacks())
    }, [packName, min, max, sortPacks, page, pageCount, showPacks, dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Box>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Typography variant={'h6'}>Packs list</Typography>
                <Button variant={'contained'}>Add new pack</Button>
            </Box>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Box>
                    <Typography variant={'body2'}>Search</Typography>
                    <TextField size={'small'}/>
                </Box>
                <ToggleButtonBox/>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label={'simple table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align={'left'}>Cards</TableCell>
                            <TableCell align={'left'}>Last Updated</TableCell>
                            <TableCell align={'left'}>Created by</TableCell>
                            <TableCell align={'left'}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((p) => (
                            <TableRow
                                key={p._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component={'th'} scope={'row'}>
                                    {p.name}
                                </TableCell>
                                <TableCell align={'left'}>{p.cardsCount}</TableCell>
                                <TableCell align={'left'}>{p.updated}</TableCell>
                                <TableCell align={'left'}>{p.created}</TableCell>
                                <TableCell align={'left'}>Actions</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component={'div'}
                count={cardPacksTotalCount}
                rowsPerPage={pageCount}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};