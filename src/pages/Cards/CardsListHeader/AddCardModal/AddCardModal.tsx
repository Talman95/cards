import React, {FC, useState} from 'react';
import {
    Divider,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {AddCardType} from "../../../../api/cardsAPI";
import CloseIcon from '@mui/icons-material/Close';
import {TextBlock} from "../../../../components/TextBlock/TextBlock";
import {PictureBlock} from "../../../../components/PictureBlock/PictureBlock";
import {BottomNavigationButtons} from "../../../../components/BottomNavigationButtons/BottomNavigationButtons";

type QuestionFormat = 'Text' | 'Picture'
type AddCardModalType = {
    cardsPack_id: string | null
    navigateBack: () => void
    addCard: (card: AddCardType) => void
}

export const AddCardModal: FC<AddCardModalType> = ({cardsPack_id, navigateBack, addCard}) => {
    const [format, setFormat] = useState<QuestionFormat>('Text')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionImg, setQuestionImg] = useState<string | null>('')
    const [answerImg, setAnswerImg] = useState<string | null>('')

    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value as QuestionFormat)
    }
    const clickSaveHandler = () => {
        if (cardsPack_id) {
            let card: AddCardType = {
                cardsPack_id,
            }
            if (format === 'Text') {
                card = {
                    ...card,
                    question,
                    answer,
                }
            } else {
                card = {
                    ...card,
                    questionImg,
                    answerImg,
                }
            }
            addCard(card)
        }
    }

    return (
        <>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <Typography id={'title'} variant={'h6'} component={'h2'}>
                        Add new card
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton>
                        <CloseIcon onClick={navigateBack}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
            <Typography color={'text.secondary'} variant={'body2'}>
                Choose a question format:
            </Typography>
            <FormControl fullWidth>
                <Select
                    input={<OutlinedInput/>}
                    value={format}
                    onChange={handleChange}
                    size={'small'}
                >
                    <MenuItem value={'Text'}>Text</MenuItem>
                    <MenuItem value={'Picture'}>Picture</MenuItem>
                </Select>
            </FormControl>
            {format === 'Text'
                ?
                <TextBlock
                    question={question}
                    setQuestion={setQuestion}
                    answer={answer}
                    setAnswer={setAnswer}
                />
                :
                <PictureBlock
                    question={questionImg}
                    setQuestion={setQuestionImg}
                    answer={answerImg}
                    setAnswer={setAnswerImg}
                />
            }
            <BottomNavigationButtons navigateBack={navigateBack} clickSave={clickSaveHandler}/>
        </>
    )
}