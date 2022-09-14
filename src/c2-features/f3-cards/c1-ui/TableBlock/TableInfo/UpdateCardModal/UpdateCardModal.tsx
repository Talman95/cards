import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    OutlinedInput,
    Select, SelectChangeEvent, Stack,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {UpdateCardType} from "../../../../c3-dal/cardsAPI";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

type QuestionFormat = 'Text'
type UpdateCardModalType = {
    cardId: string
    question: string
    answer: string
    navigateBack: () => void
    updateCard: (card: UpdateCardType) => void
}

export const UpdateCardModal: FC<UpdateCardModalType> = (
    {
        cardId,
        question,
        answer,
        navigateBack,
        updateCard,
    }) => {
    const [format, setFormat] = useState<QuestionFormat>('Text')
    const [newQuestion, setNewQuestion] = useState(question)
    const [newAnswer, setNewAnswer] = useState(answer)

    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value as QuestionFormat)
    }
    const clickSaveHandler = () => {
        const card = {
            _id: cardId,
            question: newQuestion,
            answer: newAnswer,
        }
        updateCard(card)
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
                    labelId={'select-format'}
                    id={'select-format'}
                    input={<OutlinedInput/>}
                    value={format}
                    defaultValue={'Text'}
                    onChange={handleChange}
                >
                    <MenuItem value={'Text'}>Text</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id={newQuestion}
                label={'Question'}
                variant={'outlined'}
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.currentTarget.value)}
            />
            <TextField
                id={newAnswer}
                label={'Answer'}
                variant={'outlined'}
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.currentTarget.value)}
            />
            <Stack direction={'row'} spacing={2} style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button
                    variant={'outlined'}
                    onClick={navigateBack}
                    style={{width: 150}}
                >
                    Cancel
                </Button>
                <Button
                    variant={'contained'}
                    onClick={clickSaveHandler}
                    style={{width: 150}}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
}