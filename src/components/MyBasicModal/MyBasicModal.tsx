import React, {FC} from 'react';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";
import {useActions} from "../../hooks/useActions";

type PropsType = {
    modalType: null | string
    children: JSX.Element
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
}

export const MyBasicModal: FC<PropsType> = ({modalType, children}) => {
    const {setModalClose} = useActions()

    const onCloseClick = () => {
        setModalClose()
    }

    return (
        <Modal
            open={!!modalType}
            onClose={onCloseClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    );
}