import { ProfileType } from '../../types';
import { RootState } from '../store';

export const profileSelectors = {
  selectProfile: (state: RootState): ProfileType | null => state.profile.profile,
};
