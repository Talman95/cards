import {cardsActions} from "./cardsSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {AddCardType, cardsAPI, UpdateCardType} from "../../api/cardsAPI";
import {handleAppError} from "../../utils/errorUtils";
import {appActions} from "../CommonActions/App";

const {setAppStatus} = appActions

const getCards = createAsyncThunk(
    'cards/getCards',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        thunkAPI.dispatch(cardsActions.setCardsLoad(true))
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
            thunkAPI.dispatch(setAppStatus({status: 'idle'}))
            return res.data
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

const addCard = createAsyncThunk(
    'cards/addCards',
    async (card: AddCardType, thunkAPI) => {
        thunkAPI.dispatch(cardsActions.setCardsLoad(false))
        try {
            await cardsAPI.addCard(card)
            const state = thunkAPI.getState() as RootState
            const packId = state.cards.cardsPack_id

            if (packId) {
                await thunkAPI.dispatch(getCards(packId))
            }
        } catch (e) {
            return handleAppError(e, thunkAPI)
        }
    })

const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(cardsActions.setCardsLoad(false))
        try {
            const state = thunkAPI.getState() as RootState
            const packId = state.cards.cardsPack_id

            if (packId) {
                await cardsAPI.deleteCard(id)
                await thunkAPI.dispatch(getCards(packId))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(null)
        }
    })

const updateCard = createAsyncThunk(
    'cards/updateCard',
    async (card: UpdateCardType, thunkAPI) => {
        thunkAPI.dispatch(cardsActions.setCardsLoad(false))
        try {
            const state = thunkAPI.getState() as RootState
            const packId = state.cards.cardsPack_id

            if (packId) {
                await cardsAPI.updateCard(card)
                await thunkAPI.dispatch(getCards(packId))
            }
        } catch {
            return thunkAPI.rejectWithValue(null)
        }
    })


export const cardsAsyncThunks = {
    getCards,
    addCard,
    deleteCard,
    updateCard,
}