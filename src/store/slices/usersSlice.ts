import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { itemsPerPage } from '../../enums/itemsPerPage';
import { UserType } from '../../types';
import { usersAsyncThunk } from '../middlewares/users';

export type UsersFilterType = {
  userName: string;
  page: number;
  pageCount: number;
  sortUsers: null | string;
  min: null | number;
  max: null | number;
};

const slice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserType[],
    maxPublicCardPacksCount: 0,
    minPublicCardPacksCount: 0,
    usersTotalCount: 0,
    filter: {
      userName: '',
      page: 1,
      pageCount: itemsPerPage.DEFAULT,
      sortUsers: null,
      min: null,
      max: null,
    } as UsersFilterType,
    viewedUser: null as null | UserType,
    userIsLoading: false,
  },
  reducers: {
    setUsersPage: (state, action: PayloadAction<number>) => {
      state.filter.page = action.payload;
    },
    setUsersPageCount: (state, action: PayloadAction<number>) => {
      state.filter.pageCount = action.payload;
      state.filter.page = 1;
    },
    setSearchUserName: (state, action: PayloadAction<string>) => {
      state.filter.userName = action.payload;
      state.filter.page = 1;
    },
    setMinMaxUsersCount: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.filter.min = action.payload.min;
      state.filter.max = action.payload.max;
    },
    removeUsersData: state => {
      state.viewedUser = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(usersAsyncThunk.getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.maxPublicCardPacksCount = action.payload.maxPublicCardPacksCount;
        state.minPublicCardPacksCount = action.payload.minPublicCardPacksCount;
        state.usersTotalCount = action.payload.usersTotalCount;
      })
      .addCase(usersAsyncThunk.getUserData.pending, state => {
        state.userIsLoading = true;
      })
      .addCase(usersAsyncThunk.getUserData.fulfilled, (state, action) => {
        state.viewedUser = action.payload.user;
        state.userIsLoading = false;
      });
  },
});

export const { reducer: usersSlice, actions: usersActions } = slice;
