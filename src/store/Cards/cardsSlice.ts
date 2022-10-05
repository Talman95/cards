import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "../../api/cardsAPI";
import {cardsAsyncThunks} from "./asyncThunk";

const slice = createSlice({
    name: 'cards',
    initialState: {
        cards: [] as CardType[],
        cardsTotalCount: 0,
        page: 1,
        pageCount: 10,
        packUserId: '',
        sortCards: '0updated',
        cardsPack_id: null as null | string,
        isLoading: false,
        cardAnswer: '',
        cardQuestion: '',
    },
    reducers: {
        setCardsPackId: (state, action: PayloadAction<string>) => {
            state.cardsPack_id = action.payload
        },
        removeCardsData: (state) => {
            state.cards = []
            state.cardsTotalCount = 0
            state.cardQuestion = ''
            state.cardAnswer = ''
            state.page = 1
            state.pageCount = 10
            state.sortCards = '0updated'
            state.isLoading = false
            state.cardsPack_id = null
        },
        setCurrentPageCards: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageCountCards: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
            state.page = 1
        },
        setCardsLoad: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setSortCards: (state, action: PayloadAction<string>) => {
            state.sortCards = action.payload
            state.page = 1
        },
        setCardQuestion: (state, action: PayloadAction<string>) => {
            state.cardQuestion = action.payload
            state.page = 1
        },
        setCardAnswer: (state, action: PayloadAction<string>) => {
            state.cardAnswer = action.payload
            state.page = 1
        },
        resetSetting: (state, action: PayloadAction<undefined>) => {
            state.cardQuestion = ''
            state.cardAnswer = ''
            state.page = 1
            state.sortCards = '0updated'
            state.isLoading = false
            state.pageCount = 10
        }
    },
    extraReducers: builder => {
        builder.addCase(cardsAsyncThunks.getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.packUserId = action.payload.packUserId
            state.isLoading = false
        })
    }
})

export const cardsSlice = slice.reducer
export const cardsActions = slice.actions