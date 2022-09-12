import React, {FC, useState} from 'react';
import {
    Box,
    Button, Divider,
    FormControl, Grid, IconButton,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {AddCardType} from "../../../c3-dal/cardsAPI";
import CloseIcon from '@mui/icons-material/Close';

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
type AddCardModalType = {
    cardsPack_id: string
    navigateBack: () => void
    addCard: (card: AddCardType) => void
}

export const AddCardModal: FC<AddCardModalType> = ({cardsPack_id, navigateBack, addCard}) => {
    const [format, setFormat] = useState<QuestionFormat>('Text')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value as QuestionFormat)
    }
    const clickSaveHandler = () => {
        const card = {
            cardsPack_id,
            question,
            answer,
        }
        addCard(card)
    }

    return (
        <Box sx={style}>
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
                    labelId={'select-format'}
                    id={'select-format'}
                    input={<OutlinedInput/>}
                    value={format}
                    defaultValue={'Text'}
                    label={'Age'}
                    onChange={handleChange}
                >
                    <MenuItem value={'Text'}>Text</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id={question}
                label={'Question'}
                variant={'outlined'}
                value={question}
                onChange={(e) => setQuestion(e.currentTarget.value)}
            />
            <TextField
                id={answer}
                label={'Answer'}
                variant={'outlined'}
                value={answer}
                onChange={(e) => setAnswer(e.currentTarget.value)}
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