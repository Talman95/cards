import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  AddCardType,
  AddPackParamsType,
  UpdateCardType,
  UpdatePackType,
} from '../../api';

const slice = createSlice({
  name: 'modal',
  initialState: {
    type: null as null | string,
    data: null as null | ModalDateType,
    isFetch: false, // правильное название переменной
  },
  reducers: {
    setModalOpen: (
      state,
      action: PayloadAction<{ type: string; data: ModalDateType | null }>,
    ) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    setModalClose: state => {
      state.type = null;
      state.data = null;
    },
  },
});

export const { reducer: modalSlice, actions: modalActions } = slice;

export type DeleteModalType = {
  id: string;
  title: string;
};
export type ShowUserModalType = {
  id: string;
};

export type ModalDateType =
  | AddPackParamsType
  | UpdatePackType
  | AddCardType
  | UpdateCardType
  | DeleteModalType
  | ShowUserModalType;
