import React, { FC } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Search } from '../../../components/Search/Search';
import { useActions } from '../../../hooks/useActions';
import { selectors } from '../../../store';

export const SearchBlock: FC = () => {
  const { setCardQuestion, setCardAnswer } = useActions();

  const cardAnswer = useSelector(selectors.cardsSelectors.selectCardAnswer);
  const cardQuestion = useSelector(selectors.cardsSelectors.selectCardQuestion);

  const setSearchQuestion = (question: string): void => {
    setCardQuestion(question);
  };
  const setSearchAnswer = (answer: string): void => {
    setCardAnswer(answer);
  };

  return (
    <Stack direction="row" spacing={4} style={{ marginBottom: '30px' }}>
      <Box>
        <Typography variant="body2">Search by question:</Typography>
        <Search title={cardQuestion} setTitle={setSearchQuestion} />
      </Box>
      <Box>
        <Typography variant="body2">Search by answer:</Typography>
        <Search title={cardAnswer} setTitle={setSearchAnswer} />
      </Box>
    </Stack>
  );
};
