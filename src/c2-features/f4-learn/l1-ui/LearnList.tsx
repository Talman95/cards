import React, {FC, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    Typography
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../../c1-main/m1-ui/routes/RoutesPage";
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {getLearnedCards} from "../l2-bll/learnReducer";
import {getCard} from "../../../c0-common/c3-utils/smartRandom";
import {CardType} from "../../f3-cards/c3-dal/cardsAPI";

export const LearnList: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams<{ cardsPack_id?: string }>()

    const cards = useAppSelector(state => state.learn.learnedPack)
    const isFetching = useAppSelector(state => state.learn.isFetching)
    const cardPack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === cardsPack_id))

    const [currentCard, setCurrentCard] = useState<null | CardType>(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [grade, setGrade] = useState<null | number>(null)

    useEffect(() => {
        if (!cardsPack_id) return

        dispatch(getLearnedCards(cardsPack_id))
    }, [cardsPack_id])

    useEffect(() => {
        setCurrentCard(getCard(cards))
    }, [cards])

    useEffect(() => {
        return () => {
         console.log('clear effect')
            setCurrentCard(null)
        }
    }, [])

    const handleShowAnswer = () => setShowAnswer(true)
    const handleNextClick = () => {
        setCurrentCard(getCard(cards))
        setShowAnswer(false)
    }
    const handleChange = (grade: number) => {
        setGrade(grade)
    }
    const navigateToPacksList = () => navigate(PATH.PACKS)

    if (!currentCard || isFetching) {
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
            <Typography variant={'h6'} component={'div'} align={'center'} style={{margin: 16}}>
                Learn {cardPack?.name}
            </Typography>
            <Card style={{width: 400}}>
                <CardContent>
                    <Typography style={{marginBottom: '16px'}}>
                        <strong>Question:</strong> {currentCard.question}
                    </Typography>
                    <Typography color={'text.secondary'} variant={'body2'} align={'center'}>
                        Number of attempts to answer the question: {currentCard.shots}
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
                            <strong>Answer:</strong> {currentCard.answer}
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