import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {packsAPI, PackType} from "../p3-dal/packsAPI";
import {RootState} from "../../../c1-main/m2-bll/store";

export type ShowPacksType = 'My' | 'All'

export const getPacks = createAsyncThunk(
    'packs/getPacks',
    async (params: undefined, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            const {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                showPacks,
            } = state.packs
            const user_id = state.profile.profile?._id
            let res;
            if (showPacks === 'My' && user_id) {
                res = await packsAPI.getPacks(
                    {packName, min, max, sortPacks, page, pageCount, user_id}
                )
            } else {
                res = await packsAPI.getPacks(
                    {packName, min, max, sortPacks, page, pageCount}
                )
            }
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
        max: 1000,
        min: 0,
        page: 1,
        pageCount: 10,
        packName: '',
        sortPacks: '0updated',
        showPacks: 'All' as ShowPacksType,
    },
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageCount: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
            state.page = 1
        },
        setShowPacks: (state, action: PayloadAction<ShowPacksType>) => {
            state.showPacks = action.payload
            state.page = 1
        }
    },
    extraReducers: builder => {
        builder.addCase(getPacks.fulfilled, (state, action) => {
            state.cardPacks = action.payload.cardPacks
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
        })
    }
})

export const packsReducer = slice.reducer
export const {
    setCurrentPage,
    setPageCount,
    setShowPacks,
} = slice.actions