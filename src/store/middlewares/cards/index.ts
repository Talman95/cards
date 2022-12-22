import { addCard } from './addCard';
import { deleteCard } from './deleteCard';
import { getCards } from './getCards';
import { updateCard } from './updateCard';

export const cardsAsyncThunks = {
  getCards,
  addCard,
  deleteCard,
  updateCard,
};
