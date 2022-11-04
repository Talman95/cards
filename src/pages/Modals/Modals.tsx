import React from 'react';
import {useAppSelector} from "../../hooks/hooks";
import {BasicModal} from "../../components/BasicModal/BasicModal";
import {modalWatcher} from "../../utils/modalWatcher";

export const Modals = () => {
    const type = useAppSelector(state => state.modal.type)

    return (
        <BasicModal type={type}>
            <>
                {modalWatcher(type)}
            </>
        </BasicModal>
    )
}