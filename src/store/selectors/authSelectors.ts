import { RootState } from '../store';

export const authSelectors = {
  selectIsLoggedIn: (state: RootState): boolean => state.auth.isLoggedIn,
  selectIsRegistered: (state: RootState): boolean => state.auth.isRegistered,
};
