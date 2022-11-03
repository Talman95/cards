import {modalType} from "../enums/modalType";
import React, {ReactElement} from 'react';
import {PackModal} from "../pages/Modals/PackModal/PackModal";

export const modalWatcher = (type: string | null): ReactElement | null | undefined => {
    if (type === modalType.ADD_PACK || type === modalType.UPDATE_PACK) return <PackModal/>
}