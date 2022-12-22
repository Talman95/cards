import { UserType } from '../../types';

export type GetUsersParams = {
  userName?: string;
  min?: number | null;
  max?: number | null;
  sortUsers?: string | null;
  page?: number;
  pageCount?: number;
};

export type GetUsersResponseType = {
  users: UserType[];
  maxPublicCardPacksCount: number;
  minPublicCardPacksCount: number;
  page: number;
  pageCount: number;
  usersTotalCount: number;
};
