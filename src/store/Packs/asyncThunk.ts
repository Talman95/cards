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

            const packs = state.packs
            const userId = state.profile.profile?._id

            const res = await packsAPI.getPacks({
                ...packs.filter,
                page: packs.page,
                pageCount: packs.pageCount,
                user_id: packs.accessory === 'my' ? userId : null,
            })

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