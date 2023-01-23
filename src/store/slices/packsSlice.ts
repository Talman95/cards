import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PackType } from '../../types';
import { packsAsyncThunks } from '../middlewares/packs';

export type AccessoryType = 'my' | 'all';
export type PacksFilterType = {
  packName: string;
  min: null | number;
  max: null | number;
  sortPacks: null | string;
};

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
      min: null,
      max: null,
      sortPacks: null,
    } as PacksFilterType,
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

export const { reducer: packsSlice, actions: packsActions } = slice;
