import React from 'react';
import {useAppSelector} from "../../../hooks/hooks";

export const PackModal = () => {
    const modalType = useAppSelector(state => state.modal.modalType)

    return (
        <div>{modalType}</div>
    )
}