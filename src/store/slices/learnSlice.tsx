import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardType } from '../../types';
import { learnAsyncThunks } from '../middlewares/learn';

const slice = createSlice({
  name: 'learn',
  initialState: {
    learnedPack: null as CardType[] | null,
    isFetching: false,
  },
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(learnAsyncThunks.getLearnedCards.fulfilled, (state, action) => {
      state.learnedPack = action.payload;
      state.isFetching = false;
    });
    builder.addCase(learnAsyncThunks.updateGradeCard.fulfilled, (state, action) => {
      if (state.learnedPack) {
        const index = state.learnedPack.findIndex(p => p._id === action.payload.card_id);

        if (index !== -1) {
          state.learnedPack[index].grade = action.payload.grade;
          state.learnedPack[index].shots = action.payload.shots;
        }
      }
    });
  },
});

export const { reducer: learnSlice, actions: learnActions } = slice;
