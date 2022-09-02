import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI, CardsType} from "../c3-dal/cardsAPI";
import {RootState} from "../../../c1-main/m2-bll/store";

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (id: string, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            const {sortCards, page, pageCount} = state.cards
            const res = await cardsAPI.getCards({
                cardsPack_id: id,
                sortCards,
                page,
                pageCount,
            })
            return res.data
        } catch {
            return thunkAPI.rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: 'cards',
    initialState: {
        cards: [] as CardsType[],
        cardsTotalCount: 0,
        page: 1,
        pageCount: 10,
        packUserId: '',
        sortCards: '0updated',
        cardsPack_id: '',
    },
    reducers: {
        setCardPackId: (state, action: PayloadAction<string>) => {
            state.cardsPack_id = action.payload
        },
        setCurrentPageCards: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageCountCards: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
            state.page = 1
        },
    },
    extraReducers: builder => {
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.packUserId = action.payload.packUserId
        })
    }
})

export const cardsReducer = slice.reducer
export const {
    setCardPackId,
    setCurrentPageCards,
    setPageCountCards,
} = slice.actions