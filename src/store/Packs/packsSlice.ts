import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PackType} from "../../api/packsAPI";
import {packsAsyncThunks} from "./asyncThunk";

export type AccessoryType = 'my' | 'all'

const slice = createSlice({
    name: 'packs',
    initialState: {
        cardPacks: [] as PackType[],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        accessory: 'all' as AccessoryType,
        page: 1,
        pageCount: 5,
        filter: {
            packName: '',
            min: null as null | number,
            max: null as null | number,
            sortPacks: null as null | string,
        }
    },
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageCount: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
            state.page = 1
        },
        setMinMaxPacksCount: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.filter.min = action.payload.min
            state.filter.max = action.payload.max
            state.page = 1
        },
        setShowPacks: (state, action: PayloadAction<{ accessory: AccessoryType}>) => {
            state.accessory = action.payload.accessory
            state.filter.min = null
            state.filter.max = null
            state.page = 1
        },
        setPackName: (state, action: PayloadAction<string>) => {
            state.filter.packName = action.payload
            state.page = 1
        },
        setNewPackName: (state, action: PayloadAction<string>) => {
            state.filter.packName = action.payload
            state.page = 1
        },
        setDefaultValues: (state) => {
            state.page = 1
            state.pageCount = 5
            state.filter.min = null
            state.filter.max = null
            state.filter.packName = ''
            state.filter.sortPacks = null
        },
        setSortPacks: (state, action: PayloadAction<string>) => {
            state.filter.sortPacks = action.payload
            state.page = 1
        },
        setAccessory: (state, action: PayloadAction<AccessoryType>) => {
            state.accessory = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(packsAsyncThunks.getPacks.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.minCardsCount = action.payload.minCardsCount
        })
    }
})

export const packsSlice = slice.reducer
export const packsActions = slice.actions