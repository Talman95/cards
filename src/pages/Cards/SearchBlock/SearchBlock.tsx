import React, {FC} from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {Search} from "../../../components/search/Search";
import {useAppSelector} from "../../../hooks/hooks";
import {useActions} from "../../../hooks/useActions";

export const SearchBlock: FC = () => {
    const {setCardQuestion, setCardAnswer} = useActions()

    const cardAnswer = useAppSelector(state => state.cards.cardAnswer)
    const cardQuestion = useAppSelector(state => state.cards.cardQuestion)
    const status = useAppSelector(state => state.app.status)

    const setSearchQuestion = (question: string) => {
        setCardQuestion(question)
    }
    const setSearchAnswer = (answer: string) => {
        setCardAnswer(answer)
    }

    return (
        <Stack direction="row" spacing={4}>
            <Box>
                <Typography variant={'body2'}>
                    Search by question:
                </Typography>
                <Search
                    title={cardQuestion}
                    setTitle={setSearchQuestion}
                    blocked={status === 'loading'}
                />
            </Box>
            <Box>
                <Typography variant={'body2'}>
                    Search by answer:
                </Typography>
                <Search
                    title={cardAnswer}
                    setTitle={setSearchAnswer}
                    blocked={status === 'loading'}
                />
            </Box>
        </Stack>
    )
}