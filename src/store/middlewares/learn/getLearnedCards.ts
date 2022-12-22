import { createAsyncThunk } from '@reduxjs/toolkit';

import { cardsAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { learnActions } from '../../slices/learnSlice';

const { setAppStatus } = appActions;

export const getLearnedCards = createAsyncThunk(
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
