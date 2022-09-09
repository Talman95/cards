import React, {FC} from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {Search} from "../../../../c0-common/c2-components/Search/Search";
import {useAppDispatch, useAppSelector} from "../../../../c0-common/c1-hooks/hooks";
import {setCardAnswer, setCardQuestion} from "../../c2-bll/cardsReducer";

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