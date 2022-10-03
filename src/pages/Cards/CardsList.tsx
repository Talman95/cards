import React, {FC, useEffect} from 'react';
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../components/routes/RoutesPage";
import {useAppSelector} from "../../hooks/hooks";
import {SearchBlock} from "./SearchBlock/SearchBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {CardsListHeader} from "./CardsListHeader/CardsListHeader";
import {useActions} from "../../hooks/useActions";

export const CardsList: FC = () => {
    const navigate = useNavigate()
    const {getCards, resetSetting} = useActions()

    const cards = useAppSelector(state => state.cards.cards)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    const cardsLoaded = useAppSelector(state => state.cards.cardsLoaded)
    const cardAnswer = useAppSelector(state => state.cards.cardAnswer)
    const cardQuestion = useAppSelector(state => state.cards.cardQuestion)

    useEffect(() => {
        getCards(cardsPack_id)
    }, [cardsPack_id, page, pageCount, sortCards, cardAnswer, cardQuestion])

    useEffect(() => {
        return () => {
            resetSetting()
        }
    }, [])

    const navigateToPacksList = () => navigate(PATH.PACKS)

    if (!cardsLoaded) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    if (!cardsPack_id) {
        return <Navigate to={PATH.PACKS} replace={true}/>
    }

    return (
        <Box>
            <Box>
                <IconButton aria-label={'delete'} size={'small'} onClick={navigateToPacksList}>
                    <KeyboardBackspaceIcon fontSize={'small'}/>
                </IconButton>
            </Box>
            <CardsListHeader/>
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
                <TableBlock/>
            }
        </Box>
    )
}