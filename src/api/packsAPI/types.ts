import { PackType } from '../../types';

export type GetPacksParamsType = {
  packName: string | null;
  min: number | null;
  max: number | null;
  sortPacks: string | null;
  page: number | null;
  pageCount: number | null;
  user_id?: string | null;
};

export type GetPacksType = {
  cardPacks: Array<PackType>;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type AddPackParamsType = {
  name: string;
  deckCover?: string | null;
  isPrivate?: boolean | null;
};

export type UpdatePackType = {
  _id: string;
  name?: string;
  deckCover?: string | null;
  isPrivate?: boolean;
};
