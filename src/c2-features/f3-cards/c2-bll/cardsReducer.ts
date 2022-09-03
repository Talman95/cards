import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddCardType, cardsAPI, CardsType} from "../c3-dal/cardsAPI";
import {RootState} from "../../../c1-main/m2-bll/store";
import {handleAppError} from "../../../c0-common/c3-utils/errorUtils";
import {setAppStatus} from "../../../c1-main/m2-bll/appReducer";

export const getCards = createAsyncThunk(
    'cards/getCards',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setCardsLoad(false))
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            const state = thunkAPI.getState() as RootState
            const {sortCards, page, pageCount} = state.cards
            const res = await cardsAPI.getCards({
                cardsPack_id: id,
                sortCards,
                page,
                pageCount,
            })
            thunkAPI.dispatch(setAppStatus('idle'))
            return res.data
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })
export const addCard = createAsyncThunk(
    'cards/addCards',
    async (card: AddCardType, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus('loading'))
        try {
            await cardsAPI.addCard(card)
            await thunkAPI.dispatch(getCards(card.cardsPack_id))
            thunkAPI.dispatch(setAppStatus('idle'))
        } catch (e) {
            return handleAppError(e, thunkAPI)
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
        setCardsLoad: (state, action: PayloadAction<boolean>) => {
            state.cardsLoaded = action.payload
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
} = slice.actions