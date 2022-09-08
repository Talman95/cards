import React, {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {addPack, getPacks, setCurrentPage, setPageCount, setSortPacks} from "../p2-bll/packsReducer";
import {Navigate} from "react-router-dom";
import {PacksTableBody} from "./FilterBlock/PacksTableBody/PacksTableBody";
import {visuallyHidden} from '@mui/utils';
import {FilterBlock} from "./FilterBlock/FilterBlock";

export const PacksList: FC = () => {
    const dispatch = useAppDispatch()
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

    useEffect(() => {
        dispatch(getPacks())
    }, [packName, min, max, sortPacks, page, pageCount, showPacks, dispatch])

    const addPackHandler = () => {
        dispatch(addPack({name: 'New Pack', isPrivate: true}))
    }
    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        const currentPage = page + 1
        dispatch(setCurrentPage(currentPage))
    }
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setPageCount(+event.target.value))
    }

    type Order = 'asc' | 'desc';
    type Data = 'cardsCount' | 'updated';
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<Data>('updated');

    const sortHandler = (order: Order, orderBy: Data) => {
        const direction = order === 'asc' ? 0 : 1
        const str = direction + orderBy

        setOrder(order)
        setOrderBy(orderBy)
        dispatch(setSortPacks(str))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Box>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Typography variant={'h6'}>Packs list</Typography>
                <Button variant={'contained'} onClick={addPackHandler}>
                    Add new pack
                </Button>
            </Box>

            <FilterBlock/>

            <TableContainer component={Paper}>
                <Table sx={{width: 1000}} aria-label={'table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'} style={{width: '300px'}}>Name</TableCell>
                            <TableCell align={'left'} style={{width: '50px'}}>
                                <TableSortLabel
                                    active={orderBy === 'cardsCount'}
                                    direction={orderBy === 'cardsCount' ? order : 'asc'}
                                    onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'cardsCount')}
                                >
                                    Cards
                                    {orderBy === 'cardsCount' ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align={'left'} style={{width: '300px'}}>
                                <TableSortLabel
                                    active={orderBy === 'updated'}
                                    direction={orderBy === 'updated' ? order : 'asc'}
                                    onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'updated')}
                                >
                                    Last Updated
                                    {orderBy === 'updated' ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align={'left'} style={{width: '200px'}}>Created by</TableCell>
                            <TableCell align={'left'} style={{width: '150px'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <PacksTableBody cardPacks={cardPacks}/>
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
}