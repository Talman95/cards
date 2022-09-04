import React, {ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TableSortLabel,
    TextField,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {
    addPack,
    getPacks,
    setCurrentPage,
    setDefaultValues,
    setMinMaxCount,
    setPageCount, setSortPacks
} from "../p2-bll/packsReducer";
import {Navigate} from "react-router-dom";
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";
import {DoubleRangeCards} from "./DoubleRangeCards/DoubleRangeCards";
import {ResetSettings} from "./ResetSettings/ResetSettings";
import {PacksTableBody} from "./PacksTableBody/PacksTableBody";
import { visuallyHidden } from '@mui/utils';

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
    const [values, setValues] = useState<number[]>([min, max])

    useEffect(() => {
        dispatch(getPacks())
    }, [packName, min, max, sortPacks, page, pageCount, showPacks, dispatch])

    const addTaskHandler = () => {
        dispatch(addPack({name: 'New Pack', isPrivate: true}))
    }
    const setValuesHandler = useCallback((values: number[]) => {
        setValues(values)
    }, [])
    const resetValuesHandler = useCallback(() => {
        setValues([0, 150])
        setMinMaxCount({min: 0, max: 150})
    }, [])
    const setDefaultValuesHandler = useCallback(() => {
        setValues([0, 150])
        dispatch(setDefaultValues())
    }, [dispatch])
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
        <Box style={{width: '800px'}}>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Typography variant={'h6'}>Packs list</Typography>
                <Button variant={'contained'} onClick={addTaskHandler}>
                    Add new pack
                </Button>
            </Box>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Box>
                    <Typography variant={'body2'}>Search</Typography>
                    <TextField size={'small'}/>
                </Box>
                <ToggleButtonBox setValues={resetValuesHandler}/>
                <DoubleRangeCards values={values} setValues={setValuesHandler}/>
                <ResetSettings setValues={setDefaultValuesHandler}/>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label={'simple table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'}>Name</TableCell>
                            <TableCell align={'left'}>
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
                            <TableCell align={'left'}>
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
                            <TableCell align={'left'}>Created by</TableCell>
                            <TableCell align={'left'}>Actions</TableCell>
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