import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {packsAPI, UpdatePackType} from "../../api/packsAPI";
import {handleAppError} from "../../utils/errorUtils";
import {appActions} from "../CommonActions/App";
import {appStatus} from "../../enums/appStatus";
import {SnackbarStatus} from "../../enums/snackbarStatus";

const {setAppStatus, setAppMessage} = appActions

const getPacks = createAsyncThunk(
    'packs/getPacks',
    async (id: string | null, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus(appStatus.LOADING))
        try {
            const state = thunkAPI.getState() as RootState
            const packs = state.packs
            const userId = state.profile.profile?._id

            if (!userId) return

            const res = await packsAPI.getPacks({
                ...packs.filter,
                page: packs.page,
                pageCount: packs.pageCount,
                user_id: id === userId ? userId : id,
            })

            thunkAPI.dispatch(setAppStatus(appStatus.IDLE))
            return res.data
        } catch {
            return thunkAPI.rejectWithValue(null)
        }
    }
)

const addPack = createAsyncThunk(
    'packs/addPack',
    async (params: { name: string, deckCover?: string | null, isPrivate?: boolean | null }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus(appStatus.LOADING))
        try {
            const state = thunkAPI.getState() as RootState
            const paramUserId = state.packs.paramUserId

            await packsAPI.addPack({...params})
            await thunkAPI.dispatch(getPacks(paramUserId))
            thunkAPI.dispatch(setAppMessage({result: SnackbarStatus.SUCCESS, message: 'New pack created'}))
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

const deletePack = createAsyncThunk(
    'packs/deletePack',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus(appStatus.LOADING))
        try {
            const state = thunkAPI.getState() as RootState
            const paramUserId = state.packs.paramUserId

            await packsAPI.deletePack(id)
            await thunkAPI.dispatch(getPacks(paramUserId))
            thunkAPI.dispatch(setAppMessage({result: SnackbarStatus.ERROR, message: 'Packs deleted'}))
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    }
)

const updatePack = createAsyncThunk(
    'pack/updatePack',
    async (pack: UpdatePackType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus(appStatus.LOADING))
        try {
            const state = thunkAPI.getState() as RootState
            const paramUserId = state.packs.paramUserId

            await packsAPI.updatePack(pack)
            await thunkAPI.dispatch(getPacks(paramUserId))
            thunkAPI.dispatch(setAppMessage({result: SnackbarStatus.SUCCESS, message: 'Packs updated'}))
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