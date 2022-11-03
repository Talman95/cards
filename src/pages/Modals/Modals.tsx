import React from 'react';
import {useAppSelector} from "../../hooks/hooks";
import {MyBasicModal} from "../../components/MyBasicModal/MyBasicModal";
import {modalWatcher} from "../../utils/modalWatcher";

export const Modals = () => {
    const type = useAppSelector(state => state.modal.type)

    return (
        <MyBasicModal type={type}>
            <>
                {modalWatcher(type)}
            </>
        </MyBasicModal>
    )
}