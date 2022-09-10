import React, {FC} from 'react';
import Modal from '@mui/material/Modal';

type ModalPropsType = {
    open: boolean
    setOpen: (show: boolean) => void
    children: JSX.Element
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
            {children}
        </Modal>
    );
}