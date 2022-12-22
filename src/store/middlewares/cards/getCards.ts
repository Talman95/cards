import { createAsyncThunk } from '@reduxjs/toolkit';

import { cardsAPI } from '../../../api';
import { appStatus } from '../../../enums/appStatus';
import { handleAppError } from '../../../utils/errorUtils';
import { appActions } from '../../actions/appActions';
import { cardsActions } from '../../slices/cardsSlice';
import { RootState } from '../../store';

const { setAppStatus } = appActions;

export const getCards = createAsyncThunk(
  'cards/getCards',
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    thunkAPI.dispatch(cardsActions.setCardsLoad(true));
    try {
      const state = thunkAPI.getState() as RootState;
      const { sortCards, page, pageCount, cardQuestion, cardAnswer } = state.cards;

      const res = await cardsAPI.getCards({
        cardsPack_id: id,
        sortCards,
        page,
        pageCount,
        cardQuestion,
        cardAnswer,
      });

      thunkAPI.dispatch(setAppStatus(appStatus.IDLE));

      return res.data;
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);
