import {bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "./hooks";
import {
    allAuthActions,
    allCardsActions, allChatActions,
    allLearnActions, allModalActions,
    allPacksActions,
    allProfileActions, allUsersActions,
    appActions
} from "../store";

const allActions = {
    ...appActions,
    ...allAuthActions,
    ...allPacksActions,
    ...allCardsActions,
    ...allLearnActions,
    ...allProfileActions,
    ...allUsersActions,
    ...allChatActions,
    ...allModalActions,
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return bindActionCreators(allActions, dispatch)
}