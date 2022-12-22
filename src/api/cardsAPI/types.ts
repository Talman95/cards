import { CardType } from '../../types';

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
  questionVideo?: string;
  answerVideo?: string;
};

export type UpdateCardType = {
  _id: string;
  question?: string;
  answer?: string;
  comments?: string;
  answerImg?: string | null;
  questionImg?: string | null;
};
