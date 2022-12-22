import React, { FC, useEffect, useState } from 'react';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { path } from '../../enums/path';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/useActions';
import { CardType } from '../../types';
import { getCard } from '../../utils/smartRandom';

import { CheckboxBlock } from './CheckboxBlock/CheckboxBlock';

export const LearnList: FC = () => {
  const navigate = useNavigate();

  const { getLearnedCards, updateGradeCard } = useActions();

  const { cardsPack_id } = useParams<{ cardsPack_id?: string }>();

  const cards = useAppSelector(state => state.learn.learnedPack);
  const isFetching = useAppSelector(state => state.learn.isFetching);
  const cardPack = useAppSelector(state =>
    state.packs.cardPacks.find(p => p._id === cardsPack_id),
  );

  const [currentCard, setCurrentCard] = useState<null | CardType>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [grade, setGrade] = useState<null | number>(null);

  useEffect(() => {
    if (!cardsPack_id) return;

    getLearnedCards(cardsPack_id);
  }, [cardsPack_id]);

  useEffect(() => {
    setCurrentCard(getCard(cards));
  }, [cards]);

  useEffect(() => {
    return () => {
      setCurrentCard(null);
    };
  }, []);

  const handleShowAnswer = (): void => setShowAnswer(true);

  const handleNextClick = async (): Promise<void> => {
    if (grade && currentCard) {
      await updateGradeCard({ grade, card_id: currentCard._id });
    } else {
      await setCurrentCard(getCard(cards));
    }

    setShowAnswer(false);
    setGrade(null);
  };

  const handleChangeGrade = (grade: number): void => {
    setGrade(grade);
  };

  const navigateToPacksList = (): void => navigate(path.PACKS);

  if (!currentCard || isFetching) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box
      style={{
        width: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box alignSelf="start">
        <IconButton aria-label="delete" size="small" onClick={navigateToPacksList}>
          <KeyboardBackspaceIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="h6" component="div" align="center" style={{ margin: 16 }}>
        Learn {cardPack?.name}
      </Typography>
      <Card style={{ width: 400 }}>
        <CardContent>
          <Typography style={{ marginBottom: '16px' }}>
            <strong>Question:</strong> {currentCard.question}
          </Typography>
          <Typography color="text.secondary" variant="body2" align="center">
            Number of attempts to answer the question: {currentCard.shots}
          </Typography>
        </CardContent>
        {showAnswer ? (
          <CardContent>
            <Typography>
              <strong>Answer:</strong> {currentCard.answer}
            </Typography>
            <CheckboxBlock grade={grade} handleChange={handleChangeGrade} />
            <CardActions>
              <Button
                size="small"
                fullWidth
                onClick={handleNextClick}
                variant="contained"
              >
                Next
              </Button>
            </CardActions>
          </CardContent>
        ) : (
          <CardActions>
            <Button size="small" fullWidth onClick={handleShowAnswer} variant="contained">
              Show answer
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};
