import { createAsyncThunk } from '@reduxjs/toolkit';

import { packsAPI, UpdatePackType } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { SnackbarStatus } from '../../../enums/snackbarStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { RootState } from '../../store';

import { getPacks } from './getPacks';

const { setAppStatus, setAppMessage } = appActions;

export const updatePack = createAsyncThunk(
  'pack/updatePack',
  async (pack: UpdatePackType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      const state = thunkAPI.getState() as RootState;
      const { paramUserId } = state.packs;

      await packsAPI.updatePack(pack);
      await thunkAPI.dispatch(getPacks(paramUserId));
      thunkAPI.dispatch(
        setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'Packs updated' }),
      );
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
