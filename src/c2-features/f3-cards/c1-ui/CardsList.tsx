import React, {FC, useEffect} from 'react';
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Navigate, useNavigate} from "react-router-dom";
import {PATH} from "../../../c1-main/m1-ui/routes/RoutesPage";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {getCards, resetSetting} from "../c2-bll/cardsReducer";
import {SearchBlock} from "./SearchBlock/SearchBlock";
import {TableBlock} from "./TableBlock/TableBlock";
import {CardsListHeader} from "./CardsListHeader/CardsListHeader";

export const CardsList: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {
        cards,
        page,
        pageCount,
        sortCards,
        cardsPack_id,
        cardsLoaded,
        cardAnswer,
        cardQuestion,
    } = useAppSelector(state => state.cards)

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


    if (!cardsLoaded) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    if (!cardsPack_id) {
        return <Navigate to={PATH.PACKS} replace={true} />
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
    );
}