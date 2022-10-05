import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {packsAPI, UpdatePackType} from "../../api/packsAPI";
import {handleAppError} from "../../utils/errorUtils";
import {appActions} from "../CommonActions/App";

const {setAppStatus, setAppMessage} = appActions

const getPacks = createAsyncThunk(
    'packs/getPacks',
    async (params: undefined, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const state = thunkAPI.getState() as RootState
            const {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                accessory,
            } = state.packs
            const user_id = state.profile.profile?._id
            let res;
            if (accessory === 'my' && user_id) {
                res = await packsAPI.getPacks(
                    {packName, min, max, sortPacks, page, pageCount, user_id}
                )
            } else {
                res = await packsAPI.getPacks(
                    {packName, min, max, sortPacks, page, pageCount}
                )
            }
            thunkAPI.dispatch(setAppStatus('idle'))
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
            thunkAPI.dispatch(setAppMessage({result: 'success', message: 'New pack created'}))
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
            thunkAPI.dispatch(setAppMessage({result: 'error', message: 'Packs deleted'}))
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
            thunkAPI.dispatch(setAppMessage({result: 'success', message: 'Packs updated'}))
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