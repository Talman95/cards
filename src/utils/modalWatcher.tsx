import {modalTypes} from "../enums/modalTypes";
import React, {ReactElement} from 'react';
import {PackModal} from "../pages/Modals/PackModal/PackModal";

export const modalWatcher = (type: string | null): ReactElement | null | undefined => {
    if (type === modalTypes.ADD_PACK || type === modalTypes.UPDATE_PACK) return <PackModal/>
}