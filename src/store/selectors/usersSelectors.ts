import { UserType } from '../../types';
import { UsersFilterType } from '../slices/usersSlice';
import { RootState } from '../store';

export const usersSelectors = {
  selectUsers: (state: RootState): UserType[] => state.users.users,
  selectMaxPublicCardPacksCount: (state: RootState): number =>
    state.users.maxPublicCardPacksCount,
  selectMinPublicCardPacksCount: (state: RootState): number =>
    state.users.minPublicCardPacksCount,
  selectUsersTotalCount: (state: RootState): number => state.users.usersTotalCount,
  selectUsersFilter: (state: RootState): UsersFilterType => state.users.filter,
  selectFilterUserName: (state: RootState): string => state.users.filter.userName,
  selectFilterPage: (state: RootState): number => state.users.filter.page,
  selectFilterPageCount: (state: RootState): number => state.users.filter.pageCount,
  selectFilterSortUsers: (state: RootState): string | null =>
    state.users.filter.sortUsers,
  selectFilterMin: (state: RootState): number | null => state.users.filter.min,
  selectFilterMax: (state: RootState): number | null => state.users.filter.max,
  selectViewedUser: (state: RootState): UserType | null => state.users.viewedUser,
  selectUserIsLoading: (state: RootState): boolean => state.users.userIsLoading,
};
