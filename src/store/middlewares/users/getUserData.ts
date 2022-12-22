import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersAPI } from '../../../api';
import { handleAppError } from '../../../utils/errorUtils';

export const getUserData = createAsyncThunk(
  'users/getUserData',
  async (id: string, thunkAPI) => {
    try {
      const res = await usersAPI.getUserData(id);

      return { user: res.data.user };
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
