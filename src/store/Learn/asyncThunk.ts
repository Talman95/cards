import {createAsyncThunk} from "@reduxjs/toolkit";
import {cardsAPI} from "../../api/cardsAPI";
import {handleAppError} from "../../utils/errorUtils";
import {setAppStatus} from "../App/appSlice";
import {learnAPI} from "../../api/learnAPI";
import {setIsFetching} from "./learnSlice";

export const getLearnedCards = createAsyncThunk(
    'learn/getCards',
    async (cardsPack_id: string, thunkAPI) => {
        thunkAPI.dispatch(setIsFetching(true))
        try {
            const res = await cardsAPI.getCards({cardsPack_id})
            return res.data.cards
        } catch (e) {
            thunkAPI.dispatch(setIsFetching(false))
            return handleAppError(e, thunkAPI)
        }
    }
)

export const updateGradeCard = createAsyncThunk(
    'learn/updateGradeCard',
    async (param: {grade: number, card_id: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const res = await learnAPI.updateGrade(param.grade, param.card_id)
            thunkAPI.dispatch(setAppStatus('succeeded'))
            return res.data.updatedGrade
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    }
)