import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { RootState } from '../../store';

const { setAppStatus } = appActions;

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (param: undefined, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      const state = thunkAPI.getState() as RootState;
      const filter = { ...state.users.filter };
      const res = await usersAPI.getUsers(filter);

      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));

      return res.data;
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
