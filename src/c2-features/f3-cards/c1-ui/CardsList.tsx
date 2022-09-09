import React, {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
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
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../c1-main/m1-ui/routes/RoutesPage";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {
    addCard,
    getCards,
    resetSetting,
    setCurrentPageCards,
    setPageCountCards,
    setSortCards
} from "../c2-bll/cardsReducer";
import {CardsTableBody} from "./CardsTableBody/CardsTableBody";
import {visuallyHidden} from "@mui/utils";
import {SearchBlock} from "./SearchBlock/SearchBlock";

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
        cardAnswer,
        cardQuestion,
    } = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.profile.profile?._id)

    useEffect(() => {
        dispatch(getCards(cardsPack_id))
    }, [cardsPack_id, page, pageCount, sortCards, cardAnswer, cardQuestion, dispatch])

    useEffect(() => {
        return () => {
            dispatch(resetSetting())
        }
    }, [])

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

    type Order = 'asc' | 'desc';
    type Data = 'grade' | 'updated';
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<Data>('updated')

    const sortHandler = (order: Order, orderBy: Data) => {
        const direction = order === 'asc' ? 0 : 1
        const str = direction + orderBy

        setOrder(order)
        setOrderBy(orderBy)
        dispatch(setSortCards(str))
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
            {cards.length !== 0 && <SearchBlock/>}
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
                                <TableCell align={'left'}>
                                    <TableSortLabel
                                        active={orderBy === 'grade'}
                                        direction={orderBy === 'grade' ? order : 'asc'}
                                        onClick={() => sortHandler(order === 'asc' ? 'desc' : 'asc', 'grade')}
                                    >
                                        Grade
                                        {orderBy === 'grade' ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                                {userId === packUserId &&
                                    <TableCell align={'left'}>Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <CardsTableBody cards={cards}/>
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