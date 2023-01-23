import React, { FC, useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useActions } from '../../hooks/useActions';
import { allCardsActions, cardsSelectors } from '../../store';

import { CardsListHeader } from './CardsListHeader/CardsListHeader';
import { SearchBlock } from './SearchBlock/SearchBlock';
import { TableBlock } from './TableBlock/TableBlock';

export const CardsList: FC = () => {
  const { getCards, removeCardsData, setCardsPackId } = useActions(allCardsActions);

  const cards = useSelector(cardsSelectors.selectCards);
  const page = useSelector(cardsSelectors.selectPage);
  const pageCount = useSelector(cardsSelectors.selectPageCount);
  const sortCards = useSelector(cardsSelectors.selectSortCards);
  const cardAnswer = useSelector(cardsSelectors.selectCardAnswer);
  const cardQuestion = useSelector(cardsSelectors.selectCardQuestion);
  const cardsPack_id = useSelector(cardsSelectors.selectCardsPack_id);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    if (cardsPack_id) return;
    setCardsPackId(id);

    return () => {
      removeCardsData();
    };
  }, []);

  useEffect(() => {
    if (id != null) {
      getCards(id);
    }
  }, [page, pageCount, sortCards, cardAnswer, cardQuestion]);

  if (!id) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box style={{ width: '100%' }}>
      <CardsListHeader cardsPackId={id} length={cards.length} />
      <SearchBlock />
      <TableBlock length={cards.length} />
    </Box>
  );
};
