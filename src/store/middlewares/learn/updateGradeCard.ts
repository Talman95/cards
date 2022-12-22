import { createAsyncThunk } from '@reduxjs/toolkit';

import { learnAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';

const { setAppStatus } = appActions;

export const updateGradeCard = createAsyncThunk(
  'learn/updateGradeCard',
  async (param: { grade: number; card_id: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    try {
      const res = await learnAPI.updateGrade(param.grade, param.card_id);

      thunkAPI.dispatch(setAppStatus(appStatus.SUCCEEDED));

      return res.data.updatedGrade;
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
