import React, {ChangeEvent, FC, MouseEvent, useEffect} from 'react';
import {
    Box,
    Button, CircularProgress,
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
import {
    addCard,
    deleteCard,
    getCards,
    setCardsLoad,
    setCurrentPageCards,
    setPageCountCards, updateCard
} from "../c2-bll/cardsReducer";

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
        cardsLoaded,
    } = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.profile.profile?._id)

    useEffect(() => {
        dispatch(getCards(cardsPack_id))
        return () => {
            dispatch(setCardsLoad(true))
        }
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
    const addCardHandle = () => {
        const card = {
            cardsPack_id: cardsPack_id,
            question: 'new question 1',
            answer: 'new answer 2',
        }
        dispatch(addCard(card))
    }
    const deleteCardHandler = (id: string) => {
        dispatch(deleteCard(id))
    }
    const updateCardHandler = (id: string) => {
        const card = {
            _id: id,
            question: 'new question 5468 792',
            answer: 'new answer 1231 23',
        }
        dispatch(updateCard(card))
    }

    if (!cardsLoaded) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
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
                    <Button variant={'contained'} onClick={addCardHandle}>
                        Add new card
                    </Button>
                    :
                    <Button variant={'contained'}>
                        Learn pack
                    </Button>
                }
            </Box>
            {cards.length !== 0 &&
                <Box>
                    <Typography variant={'body2'}>
                        Search
                    </Typography>
                    <TextField size={'small'} fullWidth/>
                </Box>
            }
            {cards.length === 0
                ?
                <Box style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh'
                }}>
                    <Typography style={{opacity: '0.6'}}>
                        This pack is empty. Click add new card to fill this pack
                    </Typography>
                </Box>
                :
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
                                        <Rating name={'read-only'} value={c.grade} readOnly size={'small'}
                                                precision={0.5}/>
                                    </TableCell>
                                    {userId === packUserId &&
                                        <TableCell align={'left'} style={{width: '70px'}}>
                                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                                <IconButton aria-label={'delete'} size={'small'}>
                                                    <EditIcon fontSize={'small'}
                                                              onClick={() => updateCardHandler(c._id)}/>
                                                </IconButton>
                                                <IconButton aria-label={'delete'} size={'small'}>
                                                    <DeleteIcon fontSize={'small'}
                                                                onClick={() => deleteCardHandler(c._id)}/>
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            {cards.length !== 0 &&
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component={'div'}
                    count={cardsTotalCount}
                    rowsPerPage={pageCount}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            }
        </Box>
    );
}