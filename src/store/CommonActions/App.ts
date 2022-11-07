import {createAction} from "@reduxjs/toolkit";
import {appStatus} from "../../enums/appStatus";
import {SnackbarStatus} from "../../enums/snackbarStatus";

const setAppStatus = createAction<appStatus>('appActions/setAppStatus')
const setAppMessage = createAction<{ result: SnackbarStatus, message: string | null }>('appActions/setAppMessage')
const setInitialization = createAction<boolean>('appActions/setInitialization')

export const appActions = {
    setAppStatus,
    setAppMessage,
    setInitialization,
}