import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {packsAPI, UpdatePackType} from "../../api/packsAPI";
import {appActions} from "../App/appSlice";
import {handleAppError} from "../../utils/errorUtils";

const setAppMessage = appActions.setAppMessage
const setAppStatus = appActions.setAppStatus

const getPacks = createAsyncThunk(
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

const addPack = createAsyncThunk(
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

const deletePack = createAsyncThunk(
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
    }
)

const updatePack = createAsyncThunk(
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
    }
)

export const packsAsyncThunks = {
    getPacks,
    addPack,
    deletePack,
    updatePack,
}