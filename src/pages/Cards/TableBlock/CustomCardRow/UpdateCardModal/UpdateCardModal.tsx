import React, {FC, useState} from 'react';
import {
    Box,
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
import CloseIcon from "@mui/icons-material/Close";
import {CardType, UpdateCardType} from "../../../../../api/cardsAPI";
import {TextBlock} from "../../../../../components/TextBlock/TextBlock";
import {PictureBlock} from "../../../../../components/PictureBlock/PictureBlock";
import {BottomNavigationButtons} from "../../../../../components/BottomNavigationButtons/BottomNavigationButtons";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    minHeight: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

type QuestionFormat = 'Text' | 'Picture'
type UpdateCardModalType = {
    card: CardType
    navigateBack: () => void
    updateCard: (card: UpdateCardType) => void
}

export const UpdateCardModal: FC<UpdateCardModalType> = (
    {
        card,
        navigateBack,
        updateCard,
    }) => {

    const [format, setFormat] = useState<QuestionFormat>('Text')
    const [newQuestion, setNewQuestion] = useState(card?.question || '')
    const [newAnswer, setNewAnswer] = useState(card?.answer || '')
    const [newQuestionImg, setNewQuestionImg] = useState<string | null>(card?.questionImg || null)
    const [newAnswerImg, setNewAnswerImg] = useState<string | null>(card?.answerImg || null)

    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value as QuestionFormat)
    }
    const clickSaveHandler = () => {
        let newCard: UpdateCardType = {
            _id: card._id,
        }
        if (format === 'Text') {
            newCard = {
                ...newCard,
                question: newQuestion,
                answer: newAnswer,
            }
        } else {
            newCard = {
                ...newCard,
                questionImg: newQuestionImg,
                answerImg: newAnswerImg,
            }
        }
        updateCard(newCard)
    }


    return (
        <Box sx={style}>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <Typography id={'title'} variant={'h6'} component={'h2'}>
                        Edit card
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={navigateBack}>
                        <CloseIcon/>
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
                    question={newQuestion}
                    setQuestion={setNewQuestion}
                    answer={newAnswer}
                    setAnswer={setNewAnswer}
                />
                :
                <PictureBlock
                    question={newQuestionImg}
                    setQuestion={setNewQuestionImg}
                    answer={newAnswerImg}
                    setAnswer={setNewAnswerImg}
                />
            }
            <BottomNavigationButtons navigateBack={navigateBack} clickSave={clickSaveHandler}/>
        </Box>
    )
}