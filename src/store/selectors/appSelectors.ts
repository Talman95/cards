import { appStatus } from '../../enums/appStatus';
import { SnackbarStatus } from '../../enums/snackbarStatus';
import { RootState } from '../store';

export const appSelectors = {
  selectIsInitialized: (state: RootState): boolean => state.app.isInitialized,
  selectStatus: (state: RootState): appStatus => state.app.status,
  selectError: (state: RootState): string | null => state.app.error,
  selectMessage: (state: RootState): string | null => state.app.message,
  selectResult: (state: RootState): SnackbarStatus => state.app.result,
};
