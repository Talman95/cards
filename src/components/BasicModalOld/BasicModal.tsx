import React, {FC} from 'react';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";

type ModalPropsType = {
    open: boolean
    setOpen: (show: boolean) => void
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

export const BasicModal: FC<ModalPropsType> = (
    {
        open,
        setOpen,
        children
    }) => {

    const handleClose = () => setOpen(false)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    );
}