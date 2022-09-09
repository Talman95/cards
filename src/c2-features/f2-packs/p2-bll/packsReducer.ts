import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {packsAPI, PackType, UpdatePackType} from "../p3-dal/packsAPI";
import {RootState} from "../../../c1-main/m2-bll/store";
import {setAppMessage, setAppStatus} from "../../../c1-main/m2-bll/appReducer";
import {handleAppError} from "../../../c0-common/c3-utils/errorUtils";

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
    })
export const addPack = createAsyncThunk(
    'packs/addPack',
    async (params: { name: string, deckCover?: string, isPrivate?: boolean }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await packsAPI.addPack({...params})
            await thunkAPI.dispatch(getPacks())
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage('New pack created'))
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })
export const deletePack = createAsyncThunk(
    'packs/deletePack',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await packsAPI.deletePack(id)
            await thunkAPI.dispatch(getPacks())
            thunkAPI.dispatch(setAppStatus('idle'))
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })
export const updatePack = createAsyncThunk(
    'pack/updatePack',
    async (pack: UpdatePackType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await packsAPI.updatePack(pack)
            await thunkAPI.dispatch(getPacks())
            thunkAPI.dispatch(setAppStatus('idle'))
            thunkAPI.dispatch(setAppMessage('Pack updated'))
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

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
            state.min = 0
            state.max = 150
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
            state.showPacks = 'All'
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
    setMinMaxCount,
    setDefaultValues,
    setSortPacks,
    setPackName,
} = slice.actions