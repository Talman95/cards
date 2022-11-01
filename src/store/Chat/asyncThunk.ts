import {createAsyncThunk} from "@reduxjs/toolkit";
import {chatAPI} from "../../api/chatAPI";
import {chatActions} from "./chatSlice";
import {RootState} from "../store";

const {initMessagesHandler, newMessageSendHandler} = chatActions

export const createConnection = createAsyncThunk(
    'chat/createConnection',
    (undefined, { dispatch, getState }) => {
        const state = getState() as RootState
        if (state.profile.profile) {

        const {_id, name} = state.profile.profile
        chatAPI.createConnection(_id, name, null)
        chatAPI.subscribe(
            messages => {
                dispatch(initMessagesHandler(messages));
            },
            message => {
                dispatch(newMessageSendHandler(message));
            },
        )
        }
    }
)
export const destroyConnection = createAsyncThunk('chat/destroyConnection', () => {
    chatAPI.destroyConnection();
});

export const chatAsyncThunks = {
    createConnection,
    destroyConnection,
}