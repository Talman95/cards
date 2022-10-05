import {bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "./hooks";
import {
    allAuthActions,
    allCardsActions,
    allLearnActions,
    allPacksActions,
    allProfileActions,
    appActions
} from "../store";


const allActions = {
    ...appActions,
    ...allAuthActions,
    ...allPacksActions,
    ...allCardsActions,
    ...allLearnActions,
    ...allProfileActions,
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActions, dispatch)
}