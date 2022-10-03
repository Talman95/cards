import React, {FC} from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {Search} from "../../../components/search/Search";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {setCardAnswer, setCardQuestion} from "../../../store/Cards/cardsSlice";

export const SearchBlock: FC = () => {
    const dispatch = useAppDispatch()
    const {
        cardAnswer,
        cardQuestion,
    } = useAppSelector(state => state.cards)

    const setSearchQuestion = (question: string) => {
        dispatch(setCardQuestion(question))
    }
    const setSearchAnswer = (answer: string) => {
        dispatch(setCardAnswer(answer))
    }

    return (
        <Stack direction="row" spacing={4}>
            <Box>
                <Typography variant={'body2'}>
                    Search by question:
                </Typography>
                <Search title={cardQuestion} setTitle={setSearchQuestion}/>
            </Box>
            <Box>
                <Typography variant={'body2'}>
                    Search by answer:
                </Typography>
                <Search title={cardAnswer} setTitle={setSearchAnswer}/>
            </Box>
        </Stack>
    );
}