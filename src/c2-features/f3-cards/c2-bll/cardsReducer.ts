import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddCardType, cardsAPI, CardsType, UpdateCardType} from "../c3-dal/cardsAPI";
import {RootState} from "../../../c1-main/m2-bll/store";
import {handleAppError} from "../../../c0-common/c3-utils/errorUtils";

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setCardsLoad(false))
        try {
            const state = thunkAPI.getState() as RootState
            const {
                sortCards,
                page,
                pageCount,
                cardQuestion,
                cardAnswer,
            } = state.cards
            const res = await cardsAPI.getCards({
                cardsPack_id: id,
                sortCards,
                page,
                pageCount,
                cardQuestion,
                cardAnswer,
            })
            return res.data
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })
export const addCard = createAsyncThunk(
    'cards/addCards',
    async (card: AddCardType, thunkAPI) => {
        thunkAPI.dispatch(setCardsLoad(false))
        try {
            await cardsAPI.addCard(card)
            await thunkAPI.dispatch(getCards(card.cardsPack_id))
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })
export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setCardsLoad(false))
        try {
            const state = thunkAPI.getState() as RootState
            await cardsAPI.deleteCard(id)
            await thunkAPI.dispatch(getCards(state.cards.cardsPack_id))
        } catch (e) {
            return thunkAPI.rejectWithValue(null)
        }
    })
export const updateCard = createAsyncThunk(
    'cards/updateCard',
    async (card: UpdateCardType, thunkAPI) => {
        thunkAPI.dispatch(setCardsLoad(false))
        try {
            const state = thunkAPI.getState() as RootState
            await cardsAPI.updateCard(card)
            await thunkAPI.dispatch(getCards(state.cards.cardsPack_id))
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
        cardsLoaded: true,
        cardAnswer: '',
        cardQuestion: '',
        currentCardPackName: '',
    },
    reducers: {
        setCardPackId: (state, action: PayloadAction<{id: string, packName: string}>) => {
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
        builder.addCase(getCards.fulfilled, (state, action) => {
            state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.packUserId = action.payload.packUserId
            state.cardsLoaded = true
        })
    }
})

export const cardsReducer = slice.reducer
export const {
    setCardPackId,
    setCurrentPageCards,
    setPageCountCards,
    setCardsLoad,
    setSortCards,
    setCardQuestion,
    setCardAnswer,
    resetSetting,
} = slice.actions