import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddPackParamsType, UpdatePackType} from "../../api/packsAPI";

const slice = createSlice({
    name: 'modal',
    initialState: {
        type: null as null | string,
        data: null as null | ModalDateType,
        isFetch: false, // правильное название переменной
    },
    reducers: {
        setModalOpen: (state, action: PayloadAction<{type: string, data: ModalDateType | null}>) => {
            state.type = action.payload.type
            state.data = action.payload.data
        },
        setModalClose: (state) => {
            state.type = null
            state.data = null
        },
    },
})

export const modalSlice = slice.reducer
export const modalActions = slice.actions

export type ModalDateType =
    | AddPackParamsType
    | UpdatePackType