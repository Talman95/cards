import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {AddCardType, cardsAPI, UpdateCardType} from "../../api/cardsAPI";
import {handleAppError} from "../../utils/errorUtils";
import {setCardsLoad} from "./cardsSlice";

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