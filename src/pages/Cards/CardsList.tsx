import React, { FC, useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useActions } from '../../hooks/useActions';
import { selectors } from '../../store';

import { CardsListHeader } from './CardsListHeader/CardsListHeader';
import { SearchBlock } from './SearchBlock/SearchBlock';
import { TableBlock } from './TableBlock/TableBlock';

export const CardsList: FC = () => {
  const { getCards, removeCardsData, setCardsPackId } = useActions();

  const cards = useSelector(selectors.cardsSelectors.selectCards);
  const page = useSelector(selectors.cardsSelectors.selectPage);
  const pageCount = useSelector(selectors.cardsSelectors.selectPageCount);
  const sortCards = useSelector(selectors.cardsSelectors.selectSortCards);
  const cardAnswer = useSelector(selectors.cardsSelectors.selectCardAnswer);
  const cardQuestion = useSelector(selectors.cardsSelectors.selectCardQuestion);
  const cardsPack_id = useSelector(selectors.cardsSelectors.selectCardsPack_id);

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
    <Box>
      <CardsListHeader cardsPackId={id} length={cards.length} />
      <SearchBlock />
      <TableBlock length={cards.length} />
    </Box>
  );
};
