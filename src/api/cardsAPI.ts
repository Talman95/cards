import { api } from './api';

export type GetCardsParamsType = {
  cardsPack_id: string;
  cardAnswer?: string;
  cardQuestion?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type CardType = {
  answer: string;
  answerImg: string;
  question: string;
  questionImg: string;
  cardsPack_id: string;
  comments: string;
  grade: number;
  more_id: string;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
  rating: number;
  type: string;
};
export type GetCardsResponseType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packCreated: string;
  packDeckCover: string;
  packName: string;
  packPrivate: boolean;
  packUpdated: string;
  page: number;
  pageCount: number;
  packUserId: string;
};
export type AddCardType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string | null;
  questionImg?: string | null;
  questionVideo?: string; // "url or base 64"
  answerVideo?: string; // "url or base 64"
};
export type UpdateCardType = {
  _id: string;
  question?: string;
  answer?: string;
  comments?: string;
  answerImg?: string | null;
  questionImg?: string | null;
};

export const cardsAPI = {
  getCards: (params: GetCardsParamsType) => {
    return api.get<GetCardsResponseType>('cards/card', {
      params: { ...params },
    });
  },
  addCard: (card: AddCardType) => {
    return api.post('cards/card', {
      card,
    });
  },
  deleteCard: (id: string) => {
    return api.delete('cards/card', {
      params: {
        id,
      },
    });
  },
  updateCard: (card: UpdateCardType) => {
    return api.put('cards/card', {
      card,
    });
  },
};
