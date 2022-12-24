import { CardType } from '../../types';
import { RootState } from '../store';

export const cardsSelectors = {
  selectCards: (state: RootState): CardType[] => state.cards.cards,
  selectCardsTotalCount: (state: RootState): number => state.cards.cardsTotalCount,
  selectPage: (state: RootState): number => state.cards.page,
  selectPageCount: (state: RootState): number => state.cards.pageCount,
  selectPackUserId: (state: RootState): string => state.cards.packUserId,
  selectSortCards: (state: RootState): string => state.cards.sortCards,
  selectCardsPack_id: (state: RootState): null | string => state.cards.cardsPack_id,
  selectIsLoading: (state: RootState): boolean => state.cards.isLoading,
  selectCardAnswer: (state: RootState): string => state.cards.cardAnswer,
  selectCardQuestion: (state: RootState): string => state.cards.cardQuestion,
  selectPackDeckCover: (state: RootState): null | string => state.cards.packDeckCover,
  selectPackName: (state: RootState): null | string => state.cards.packName,
};
