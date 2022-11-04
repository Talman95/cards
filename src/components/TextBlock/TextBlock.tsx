import React, {FC} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    question: string
    setQuestion: (question: string) => void
    answer: string
    setAnswer: (answer: string) => void
}

export const TextBlock: FC<PropsType> = ({question, setQuestion, answer, setAnswer}) => {

    return (
        <>
            <TextField
                id={question}
                label={'Question'}
                variant={'outlined'}
                value={question}
                onChange={(e) => setQuestion(e.currentTarget.value)}
                size={'small'}
                style={{margin: '10px 0'}}
            />
            <TextField
                id={answer}
                label={'Answer'}
                variant={'outlined'}
                value={answer}
                onChange={(e) => setAnswer(e.currentTarget.value)}
                size={'small'}
            />
        </>
    )
}