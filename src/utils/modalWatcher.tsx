import {modalType} from "../enums/modalType";
import React, {ReactElement} from 'react';
import {PackModal} from "../pages/Modals/PackModal/PackModal";
import {CardModal} from "../pages/Modals/CardModal/CardModal";
import {DeleteModal} from "../pages/Modals/DeleteModal/DeleteModal";

export const modalWatcher = (type: string | null): ReactElement | null | undefined => {
    if (type === modalType.ADD_PACK || type === modalType.UPDATE_PACK) return <PackModal/>
    if (type === modalType.ADD_CARD || type === modalType.UPDATE_CARD) return <CardModal/>
    if (type === modalType.DELETE_PACK || type === modalType.DELETE_CARD) return <DeleteModal/>
}