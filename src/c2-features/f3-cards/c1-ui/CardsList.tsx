import React, {ChangeEvent, FC, MouseEvent, useEffect} from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Rating,
    Stack,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../c1-main/m1-ui/routes/MyRoutes";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {getCards, setCurrentPageCards, setPageCountCards} from "../c2-bll/cardsReducer";

export const CardsList: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {
        cards,
        cardsTotalCount,
        page,
        pageCount,
        sortCards,
        cardsPack_id,
        packUserId,
    } = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.profile.profile?._id)

    useEffect(() => {
        dispatch(getCards(cardsPack_id))
    }, [cardsPack_id, page, pageCount, sortCards, dispatch])

    const navigateToPacksList = () => {
        navigate(PATH.PACKS)
    }
    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        const currentPage = page + 1
        dispatch(setCurrentPageCards(currentPage))
    }
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(setPageCountCards(+event.target.value))
    }

    return (
        <Box style={{width: '800px'}}>
            <Box>
                <IconButton aria-label={'delete'} size={'small'} onClick={navigateToPacksList}>
                    <KeyboardBackspaceIcon fontSize={'small'}/>
                </IconButton>
            </Box>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Typography variant={'h6'}>Pack Name</Typography>
                {userId === packUserId
                    ?
                    <Button variant={'contained'}>
                        Add new card
                    </Button>
                    :
                    <Button variant={'contained'}>
                        Learn pack
                    </Button>
                }
            </Box>
            <Box>
                <Typography variant={'body2'}>
                    Search
                </Typography>
                <TextField size={'small'} fullWidth/>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label={'simple table'}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={'left'}>Question</TableCell>
                            <TableCell align={'left'}>Answer</TableCell>
                            <TableCell align={'left'}>Last Updated</TableCell>
                            <TableCell align={'left'}>Grade</TableCell>
                            {userId === packUserId &&
                                <TableCell align={'left'}>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map(c => (
                            <TableRow
                                key={c._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                hover
                            >
                                <TableCell component={'th'} scope={'row'} align={'left'}>
                                    {c.question}
                                </TableCell>
                                <TableCell align={'left'}>{c.answer}</TableCell>
                                <TableCell align={'left'}>{c.updated}</TableCell>
                                <TableCell align={'left'}>
                                    <Rating name={'read-only'} value={c.grade} readOnly size={'small'} precision={0.5}/>
                                </TableCell>
                                {userId === packUserId &&
                                    <TableCell align={'left'} style={{width: '70px'}}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                            <IconButton aria-label={'delete'} size={'small'}>
                                                <EditIcon fontSize={'small'}/>
                                            </IconButton>
                                            <IconButton aria-label={'delete'} size={'small'}>
                                                <DeleteIcon fontSize={'small'}/>
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component={'div'}
                count={cardsTotalCount}
                rowsPerPage={pageCount}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}