import React, {FC, useEffect} from 'react';
import {Box, CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import {SearchBlock} from "./SearchBlock/SearchBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {CardsListHeader} from "./CardsListHeader/CardsListHeader";
import {useActions} from "../../hooks/useActions";

export const CardsList: FC = () => {
    const {getCards, removeCardsData, setCardsPackId} = useActions()

    const cards = useAppSelector(state => state.cards.cards)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const cardAnswer = useAppSelector(state => state.cards.cardAnswer)
    const cardQuestion = useAppSelector(state => state.cards.cardQuestion)
    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    const cardsPack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === id))
    const title = cardsPack?.name || ''

    let {id} = useParams<{ id: string }>()

    useEffect(() => {
        if (!id) return
        if (cardsPack_id) return
        setCardsPackId(id)

        return () => {
            removeCardsData()
        }
    }, [])

    useEffect(() => {
        if (id != null) {
            getCards(id)
        }
    }, [page, pageCount, sortCards, cardAnswer, cardQuestion])

    if (!id) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <Box>
            <CardsListHeader title={title} cardsPackId={id} length={cards.length}/>
            <SearchBlock/>
            <TableBlock length={cards.length}/>
        </Box>
    )
}