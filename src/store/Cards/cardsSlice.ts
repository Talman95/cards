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
        cardsPack_id: '',
        cardsLoaded: true,
        cardAnswer: '',
        cardQuestion: '',
        currentCardPackName: '',
    },
    reducers: {
        setCardPackId: (state, action: PayloadAction<{ id: string, packName: string }>) => {
            state.cardsPack_id = action.payload.id
            state.currentCardPackName = action.payload.packName
        },
        setCurrentPageCards: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageCountCards: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload
            state.page = 1
        },
        setCardsLoad: (state, action: PayloadAction<boolean>) => {
            state.cardsLoaded = action.payload
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
            state.cardsLoaded = true
            state.pageCount = 10
        }
    },
    extraReducers: builder => {
        builder.addCase(cardsAsyncThunks.getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.packUserId = action.payload.packUserId
            state.cardsLoaded = true
        })
    }
})

export const cardsSlice = slice.reducer
export const cardsActions = slice.actions