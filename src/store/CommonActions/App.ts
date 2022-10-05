import {createAction} from "@reduxjs/toolkit";
import {AppStatusType} from "../App/appSlice";
import {AlertColor} from "@mui/material";

const setAppStatus = createAction<AppStatusType>('appActions/setAppStatus')
const setAppMessage = createAction<{ result: AlertColor, message: string | null }>('appActions/setAppMessage')
const setInitialization = createAction<boolean>('appActions/setInitialization')

export const appActions = {
    setAppStatus,
    setAppMessage,
    setInitialization,
}