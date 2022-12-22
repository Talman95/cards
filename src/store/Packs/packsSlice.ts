import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PackType } from '../../api/packsAPI';

import { packsAsyncThunks } from './asyncThunk';

export type AccessoryType = 'my' | 'all';

const slice = createSlice({
  name: 'packs',
  initialState: {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    paramUserId: null as null | string,
    filter: {
      packName: '',
      min: null as null | number,
      max: null as null | number,
      sortPacks: null as null | string,
    },
  },
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
      state.page = 1;
    },
    setMinMaxPacksCount: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filter.min = action.payload.min;
      state.filter.max = action.payload.max;
      state.page = 1;
    },
    setPackName: (state, action: PayloadAction<string>) => {
      state.filter.packName = action.payload;
      state.page = 1;
    },
    setNewPackName: (state, action: PayloadAction<string>) => {
      state.filter.packName = action.payload;
      state.page = 1;
    },
    setDefaultValues: state => {
      state.page = 1;
      state.pageCount = 5;
      state.filter.min = null;
      state.filter.max = null;
      state.filter.packName = '';
      state.filter.sortPacks = null;
    },
    setSortPacks: (state, action: PayloadAction<string>) => {
      state.filter.sortPacks = action.payload;
      state.page = 1;
    },
    setParamUserId: (state, action: PayloadAction<string | null>) => {
      state.paramUserId = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(packsAsyncThunks.getPacks.fulfilled, (state, action) => {
      if (action.payload) {
        state.cardPacks = action.payload.cardPacks;
        state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
        state.maxCardsCount = action.payload.maxCardsCount;
        state.minCardsCount = action.payload.minCardsCount;
      }
    });
  },
});

export const packsSlice = slice.reducer;
export const packsActions = slice.actions;
