import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PackType} from "../../api/packsAPI";
import {packsAsyncThunks} from "./asyncThunk";

export type AccessoryType = 'my' | 'all'

const slice = createSlice({
    name: 'packs',
    initialState: {
        cardPacks: [] as PackType[],
        cardPacksTotalCount: 0,
        max: 150,
        min: 0,
        page: 1,
        pageCount: 10,
        packName: '',
        sortPacks: '0updated',
        accessory: 'all' as AccessoryType,
    },
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageCount: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
            state.page = 1
        },
        setShowPacks: (state, action: PayloadAction<AccessoryType>) => {
            state.accessory = action.payload
            state.page = 1
        },
        setMinMaxCount: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.min = action.payload.min
            state.max = action.payload.max
            state.page = 1
        },
        setDefaultValues: (state, action: PayloadAction<undefined>) => {
            state.page = 1
            state.min = 0
            state.max = 150
            state.pageCount = 10
            state.packName = ''
            state.accessory = 'all'
            state.sortPacks = '0updated'
        },
        setSortPacks: (state, action: PayloadAction<string>) => {
            state.sortPacks = action.payload
            state.page = 1
        },
        setPackName: (state, action: PayloadAction<string>) => {
            state.packName = action.payload
            state.page = 1
        },
    },
    extraReducers: builder => {
        builder.addCase(packsAsyncThunks.getPacks.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
        })
    }
})

export const packsSlice = slice.reducer
export const packsActions = slice.actions