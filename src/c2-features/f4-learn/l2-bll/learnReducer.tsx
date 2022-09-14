import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI, CardType} from "../../f3-cards/c3-dal/cardsAPI";
import {handleAppError} from "../../../c0-common/c3-utils/errorUtils";
import {learnAPI} from "../l3-dal/learnAPI";
import {setAppStatus} from "../../../c1-main/m2-bll/appReducer";

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

const slice = createSlice({
    name: 'learn',
    initialState: {
        learnedPack: null as CardType[] | null,
        isFetching: false,
    },
    reducers: {
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getLearnedCards.fulfilled, (state, action) => {
            state.learnedPack = action.payload
            state.isFetching = false
        })
        builder.addCase(updateGradeCard.fulfilled, (state, action) => {
            if (state.learnedPack) {
                const index = state.learnedPack.findIndex(p => p._id === action.payload.card_id)
                if (index !== -1) {
                    state.learnedPack[index].grade = action.payload.grade
                    state.learnedPack[index].shots = action.payload.shots
                }
            }
        })
    }
})

export const learnReducer = slice.reducer
export const {
    setIsFetching,
} = slice.actions