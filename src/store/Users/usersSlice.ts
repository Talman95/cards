import {createSlice} from "@reduxjs/toolkit";
import {UserType} from "../../api/usersAPI";
import {usersAsyncThunk} from "./asyncThunk";

const slice = createSlice({
    name: 'users',
    initialState: {
        users: [] as UserType[],
        maxPublicCardPacksCount: 0,
        minPublicCardPacksCount: 0,
        filter: {
            userName: null as null | string,
            page: 1,
            pageCount: 5,
            sortUsers: null as null | string,
            min: null as null | number,
            max: null as null | number,
        },
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(usersAsyncThunk.getUsers.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.maxPublicCardPacksCount = action.payload.maxPublicCardPacksCount
                state.minPublicCardPacksCount = action.payload.minPublicCardPacksCount
            })
    }

})

export const usersSlice = slice.reducer