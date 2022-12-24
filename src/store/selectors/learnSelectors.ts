import { CardType } from '../../types';
import { RootState } from '../store';

export const learnSelectors = {
  selectLearnedPack: (state: RootState): CardType[] | null => state.learn.learnedPack,
  selectIsFetching: (state: RootState): boolean => state.learn.isFetching,
};
