import React, {FC, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {BasicModal} from "../../../components/modals/BasicModal";
import {AddPackParamsType} from "../../../api/packsAPI";
import {AddPackModal} from "./AddPackModal/AddPackModal";
import {useActions} from "../../../hooks/useActions";

export const PackListHeader: FC = () => {
    const {addPack} = useActions()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const addPackHandler = (pack: AddPackParamsType) => {
        addPack(pack)
        handleClose()
    }

    return (
        <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
            <Typography variant={'h6'}>Packs list</Typography>
            <Button variant={'contained'} onClick={handleOpen}>
                Add new pack
            </Button>
            <BasicModal open={open} setOpen={setOpen}>
                <AddPackModal
                    navigateBack={handleClose}
                    saveData={addPackHandler}
                />
            </BasicModal>
        </Box>
    )
}