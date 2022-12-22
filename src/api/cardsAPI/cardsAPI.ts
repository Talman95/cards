import { config } from '../config/config';

import {
  AddCardType,
  GetCardsParamsType,
  GetCardsResponseType,
  UpdateCardType,
} from './types';

export const cardsAPI = {
  getCards: (params: GetCardsParamsType) => {
    return config.get<GetCardsResponseType>('cards/card', {
      params: { ...params },
    });
  },

  addCard: (card: AddCardType) => {
    return config.post('cards/card', {
      card,
    });
  },

  deleteCard: (id: string) => {
    return config.delete('cards/card', {
      params: {
        id,
      },
    });
  },

  updateCard: (card: UpdateCardType) => {
    return config.put('cards/card', {
      card,
    });
  },
};
