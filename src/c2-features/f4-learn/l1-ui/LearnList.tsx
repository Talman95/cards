import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    Typography
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../c1-main/m1-ui/routes/RoutesPage";

export const LearnList: FC = () => {
    const navigate = useNavigate()
    const question = '123'
    const answer = '456'
    const [showAnswer, setShowAnswer] = useState(false)
    const [grade, setGrade] = useState<null | number>(null)

    const handleShowAnswer = () => setShowAnswer(true)
    const handleNextClick = () => {
        setShowAnswer(false)
    }
    const handleChange = (grade: number) => {
        setGrade(grade)
    }
    const navigateToCardsList = () => navigate(PATH.CARDS)

    return (
        <Box>
            <Box>
                <IconButton aria-label={'delete'} size={'small'} onClick={navigateToCardsList}>
                    <KeyboardBackspaceIcon fontSize={'small'}/>
                </IconButton>
            </Box>
            <Typography variant={'h6'} component={'div'} align={'center'} style={{margin: 16}}>
                Learn "Pack Name"
            </Typography>
            <Card style={{width: 400}}>
                <CardContent>
                    <Typography style={{marginBottom: '16px'}}>
                        <strong>Question:</strong> {question}
                    </Typography>
                    <Typography color={'text.secondary'} variant={'body2'} align={'center'}>
                        Number of attempts to answer the question: 10
                    </Typography>
                </CardContent>
                {!showAnswer &&
                    <CardActions>
                        <Button
                            size={'small'}
                            fullWidth
                            onClick={handleShowAnswer}
                            variant={'contained'}
                        >
                            Show answer
                        </Button>
                    </CardActions>}
                {showAnswer &&
                    <CardContent>
                        <Typography>
                            <strong>Answer:</strong> {answer}
                        </Typography>
                        <FormControl sx={{m: 3}} component={'fieldset'} variant={'standard'} size={'small'}>
                            <FormLabel component={'legend'}>Rate yourself:</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={grade === 1}
                                                  onChange={() => handleChange(1)}
                                                  name={'Did not know'}
                                                  size={'small'}
                                        />
                                    }
                                    label={'Did not know'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={grade === 2}
                                            onChange={() => handleChange(2)}
                                            name={'Forgot'}
                                            size={'small'}
                                        />
                                    }
                                    label={'Forgot'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={grade === 3}
                                            onChange={() => handleChange(3)}
                                            name={'A lot of thought'}
                                            size={'small'}
                                        />
                                    }
                                    label={'A lot of thought'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={grade === 4}
                                            onChange={() => handleChange(4)}
                                            name={'Confuced'}
                                            size={'small'}
                                        />
                                    }
                                    label={'Confuced'}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={grade === 5}
                                            onChange={() => handleChange(5)}
                                            name={'Knew the answer'}
                                            size={'small'}
                                        />
                                    }
                                    label={'Knew the answer'}
                                />
                            </FormGroup>
                        </FormControl>
                        <CardActions>
                            <Button
                                size={'small'}
                                fullWidth
                                onClick={handleNextClick}
                                variant={'contained'}
                            >
                                Next
                            </Button>
                        </CardActions>
                    </CardContent>}
            </Card>
        </Box>
    );
}