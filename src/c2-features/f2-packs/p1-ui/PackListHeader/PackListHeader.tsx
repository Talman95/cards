import React, {FC, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {addPack} from "../../p2-bll/packsReducer";
import {useAppDispatch} from "../../../../c0-common/c1-hooks/hooks";
import {BasicModal} from "../../../../c0-common/c2-components/Modals/BasicModal";
import {AddPackParamsType} from "../../p3-dal/packsAPI";
import {AddPackModal} from "./AddPackModal/AddPackModal";

export const PackListHeader: FC = () => {
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const addPackHandler = (pack: AddPackParamsType) => {
        dispatch(addPack(pack))
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
    );
}