import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI, CardType} from "../../f3-cards/c3-dal/cardsAPI";
import {handleAppError} from "../../../c0-common/c3-utils/errorUtils";

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
    }
})

export const learnReducer = slice.reducer
export const {
    setIsFetching,
} = slice.actions