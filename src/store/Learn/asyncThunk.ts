import { createAsyncThunk } from '@reduxjs/toolkit';

import { cardsAPI } from '../../api/cardsAPI';
import { learnAPI } from '../../api/learnAPI';
import { appStatus } from '../../enums/appStatus';
import { handleAppError } from '../../utils/errorUtils';
import { appActions } from '../CommonActions/App';

import { learnActions } from './learnSlice';

const { setAppStatus } = appActions;

const getLearnedCards = createAsyncThunk(
  'learn/getCards',
  async (cardsPack_id: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    thunkAPI.dispatch(learnActions.setIsFetching(true));
    try {
      const res = await cardsAPI.getCards({ cardsPack_id });

      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));

      return res.data.cards;
    } catch (e) {
      thunkAPI.dispatch(learnActions.setIsFetching(false));

      return handleAppError(e, thunkAPI);
    }
  },
);

const updateGradeCard = createAsyncThunk(
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

export const learnAsyncThunks = {
  getLearnedCards,
  updateGradeCard,
};
