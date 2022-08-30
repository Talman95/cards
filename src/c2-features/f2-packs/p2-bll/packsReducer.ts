import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetPacksParamsType, packsAPI, PackType} from "../p3-dal/packsAPI";

export const getPacks = createAsyncThunk(
    'packs/getPacks',
    async (params: GetPacksParamsType, thunkAPI) => {
        try {
            const res = await packsAPI.getPacks(params)
            return res.data
        } catch {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

const slice = createSlice({
    name: 'packs',
    initialState: {
        cardPacks: [] as PackType[],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 10,
    },
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageCount: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getPacks.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.minCardsCount = action.payload.minCardsCount
            state.page = action.payload.page
        })
    }
})

export const packsReducer = slice.reducer
export const {
    setCurrentPage,
    setPageCount
} = slice.actions