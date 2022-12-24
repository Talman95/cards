import { PackType } from '../../types';
import { PacksFilterType } from '../slices/packsSlice';
import { RootState } from '../store';

export const packsSelectors = {
  selectCardPacks: (state: RootState): PackType[] => state.packs.cardPacks,
  selectCardPacksTotalCount: (state: RootState): number =>
    state.packs.cardPacksTotalCount,
  selectMaxCardsCount: (state: RootState): number => state.packs.maxCardsCount,
  selectMinCardsCount: (state: RootState): number => state.packs.minCardsCount,
  selectPage: (state: RootState): number => state.packs.page,
  selectPageCount: (state: RootState): number => state.packs.pageCount,
  selectParamUserId: (state: RootState): null | string => state.packs.paramUserId,
  selectFilter: (state: RootState): PacksFilterType => state.packs.filter,
  selectFilterPackName: (state: RootState): string => state.packs.filter.packName,
  selectFilterMin: (state: RootState): null | number => state.packs.filter.min,
  selectFilterMax: (state: RootState): null | number => state.packs.filter.max,
  selectFilterSortPacks: (state: RootState): null | string =>
    state.packs.filter.sortPacks,
};
