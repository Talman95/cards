import React, {FC, useEffect} from 'react';
import {Box, Button, CircularProgress, IconButton, Typography} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../c1-main/m1-ui/routes/RoutesPage";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {addCard, getCards, resetSetting} from "../c2-bll/cardsReducer";
import {SearchBlock} from "./SearchBlock/SearchBlock";
import {TableBlock} from "./TableBlock/TableBlock";

export const CardsList: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {
        cards,
        page,
        pageCount,
        sortCards,
        cardsPack_id,
        packUserId,
        cardsLoaded,
        cardAnswer,
        cardQuestion,
        currentCardPackName,
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
    const addCardHandle = () => {
        const card = {
            cardsPack_id: cardsPack_id,
            question: 'new question 1 1232 2333 2232 32321 112 2321 232321',
            answer: 'new answer 222222222222222222222222222222222222222222222222222222',
        }
        dispatch(addCard(card))
    }

    if (!cardsLoaded) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <Box>
            <Box>
                <IconButton aria-label={'delete'} size={'small'} onClick={navigateToPacksList}>
                    <KeyboardBackspaceIcon fontSize={'small'}/>
                </IconButton>
            </Box>
            <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                <Typography variant={'h6'}>{currentCardPackName}</Typography>
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
                <TableBlock/>
            }
        </Box>
    );
}