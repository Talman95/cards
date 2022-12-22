import { createAsyncThunk } from '@reduxjs/toolkit';

import { packsAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { appActions } from '../../actions/appActions';
import { RootState } from '../../store';

const { setAppStatus } = appActions;

export const getPacks = createAsyncThunk(
  'packs/getPacks',
  async (id: string | null, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      const state = thunkAPI.getState() as RootState;
      const { packs } = state;
      const userId = state.profile.profile?._id;

      if (!userId) return;

      const res = await packsAPI.getPacks({
        ...packs.filter,
        page: packs.page,
        pageCount: packs.pageCount,
        user_id: id === userId ? userId : id,
      });

      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));

      return res.data;
    } catch {
      return thunkAPI.rejectWithValue(null);
    }
  },
);
