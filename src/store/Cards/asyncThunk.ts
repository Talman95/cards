import { createAsyncThunk } from '@reduxjs/toolkit';

import { AddCardType, cardsAPI, UpdateCardType } from '../../api/cardsAPI';
import { appStatus } from '../../enums/appStatus';
import { SnackbarStatus } from '../../enums/snackbarStatus';
import { handleAppError } from '../../utils/errorUtils';
import { appActions } from '../CommonActions/App';
import { RootState } from '../store';

import { cardsActions } from './cardsSlice';

const { setAppStatus, setAppMessage } = appActions;

const getCards = createAsyncThunk('cards/getCards', async (id: string, thunkAPI) => {
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
});

const addCard = createAsyncThunk(
  'cards/addCards',
  async (card: AddCardType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    thunkAPI.dispatch(cardsActions.setCardsLoad(true));
    try {
      await cardsAPI.addCard(card);
      await thunkAPI.dispatch(getCards(card.cardsPack_id));
      thunkAPI.dispatch(
        setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'New card created' }),
      );
    } catch (e) {
      return handleAppError(e, thunkAPI);
    }
  },
);

const deleteCard = createAsyncThunk('cards/deleteCard', async (id: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
  thunkAPI.dispatch(cardsActions.setCardsLoad(true));
  try {
    await cardsAPI.deleteCard(id);

    const state = thunkAPI.getState() as RootState;
    const packId = state.cards.cardsPack_id;

    if (packId) {
      await thunkAPI.dispatch(getCards(packId));
      thunkAPI.dispatch(
        setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'Card deleted' }),
      );
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(null);
  }
});

const updateCard = createAsyncThunk(
  'cards/updateCard',
  async (card: UpdateCardType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus(appStatus.LOADING));
    thunkAPI.dispatch(cardsActions.setCardsLoad(true));
    try {
      await cardsAPI.updateCard(card);

      const state = thunkAPI.getState() as RootState;
      const packId = state.cards.cardsPack_id;

      if (packId) {
        await thunkAPI.dispatch(getCards(packId));
        thunkAPI.dispatch(
          setAppMessage({ result: SnackbarStatus.SUCCESS, message: 'Card updated' }),
        );
      }
    } catch {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const cardsAsyncThunks = {
  getCards,
  addCard,
  deleteCard,
  updateCard,
};
