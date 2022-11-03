import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'modal',
    initialState: {
        modalIsOpen: false,
        modalType: null as null | string,
    },
    reducers: {
        setModalOpen: (state, action: PayloadAction<string>) => {
            state.modalType = action.payload
        },
        setModalClose: (state) => {
            state.modalType = null
        },
    },
})

export const modalSlice = slice.reducer
export const modalActions = slice.actions