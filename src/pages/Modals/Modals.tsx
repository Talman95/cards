import React from 'react';
import {useAppSelector} from "../../hooks/hooks";
import {MyBasicModal} from "../../components/MyBasicModal/MyBasicModal";

export const Modals = () => {
    const modalType = useAppSelector(state => state.modal.modalType)

    return (
        <MyBasicModal modalType={modalType}>
            <div>{modalType}</div>
        </MyBasicModal>
    )
}