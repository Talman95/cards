import React, {ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState} from 'react';
import {
    Box,
    Button, IconButton,
    Paper, Stack,
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
import {
    addPack, deletePack,
    getPacks,
    setCurrentPage,
    setDefaultValues,
    setMinMaxCount,
    setPageCount
} from "../p2-bll/packsReducer";
import {Navigate, useNavigate} from "react-router-dom";
import {ToggleButtonBox} from "./ToggleButtonBox/ToggleButtonBox";
import {DoubleRangeCards} from "./DoubleRangeCards/DoubleRangeCards";
import {ResetSettings} from "./ResetSettings/ResetSettings";
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {PATH} from "../../../c1-main/m1-ui/routes/MyRoutes";

export const PacksList: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
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
    const user_id = useAppSelector(state => state.profile.profile?._id)
    const [values, setValues] = useState<number[]>([min, max])

    useEffect(() => {
        dispatch(getPacks())
    }, [packName, min, max, sortPacks, page, pageCount, showPacks, dispatch])

    const addTaskHandler = () => {
        dispatch(addPack({name: 'New Pack', isPrivate: true}))
    }
    const deletePackHandler = (id: string) => {
        dispatch(deletePack(id))
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
    const navigateToCardsList = () => {
        navigate(PATH.CARDS)
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
                                hover
                            >
                                <TableCell component={'th'} scope={'row'} align={'left'}
                                           onClick={navigateToCardsList}
                                           style={{cursor: 'pointer'}}
                                >
                                    {p.name}
                                </TableCell>
                                <TableCell align={'left'}>{p.cardsCount}</TableCell>
                                <TableCell align={'left'}>{p.updated}</TableCell>
                                <TableCell align={'left'}>{p.user_name}</TableCell>
                                <TableCell align={'left'} style={{width: '100px'}}>
                                    {user_id === p.user_id
                                        ?
                                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                            <IconButton aria-label={'delete'} size={'small'}>
                                                <SchoolIcon fontSize={'small'}/>
                                            </IconButton>
                                            <IconButton aria-label={'delete'} size={'small'}>
                                                <EditIcon fontSize={'small'}/>
                                            </IconButton>
                                            <IconButton aria-label={'delete'} size={'small'}>
                                                <DeleteIcon fontSize={'small'}
                                                            onClick={() => deletePackHandler(p._id)}/>
                                            </IconButton>
                                        </Stack>
                                        :
                                        <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
                                            <IconButton aria-label={'delete'} size={'small'}>
                                                <SchoolIcon fontSize={'small'}/>
                                            </IconButton>
                                        </Stack>}
                                </TableCell>
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
}