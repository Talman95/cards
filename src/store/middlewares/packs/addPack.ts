import { createAsyncThunk } from '@reduxjs/toolkit';

import { packsAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { RootState } from '../../store';

import { getPacks } from './getPacks';

const { setAppStatus, setAppMessage } = appActions;

export const addPack = createAsyncThunk(
  'packs/addPack',
  async (
    params: { name: string; deckCover?: string | null; isPrivate?: boolean | null },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      const state = thunkAPI.getState() as RootState;
      const { paramUserId } = state.packs;

      await packsAPI.addPack({ ...params });
      await thunkAPI.dispatch(getPacks(paramUserId));
      thunkAPI.dispatch(
        setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'New pack created' }),
      );
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
