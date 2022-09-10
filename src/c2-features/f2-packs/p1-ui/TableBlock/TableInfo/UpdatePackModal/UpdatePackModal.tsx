import React, {FC, useState} from 'react';
import {PackType, UpdatePackType} from "../../../../p3-dal/packsAPI";
import {Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'grid',
}

type UpdatePackModalType = {
    pack: PackType | null
    navigateBack: () => void
    saveData: (data: UpdatePackType) => void
}

export const UpdatePackModal: FC<UpdatePackModalType> = (
    {
        pack,
        navigateBack,
        saveData,
    }
) => {
    const [name, setName] = useState(pack?.name)
    const [isPrivate, setIsPrivate] = useState(pack?.private)

    if (!pack) {
        return <div>!</div>
    }

    const clickSaveHandler = () => {
        const updatedPack = {
            _id: pack._id,
            name,
            isPrivate,
        }
        saveData(updatedPack)
    }

    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Update pack
            </Typography>
            <TextField
                id={name}
                label="Name pack"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
            />
            <FormControlLabel label="Private pack?" control={
                <Checkbox
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.currentTarget.checked)}
                />}
            />
            <Stack direction="row" spacing={2} style={{display:'flex', justifyContent: 'space-evenly'}}>
                <Button
                    variant="outlined"
                    onClick={navigateBack}
                    style={{width: 150}}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={clickSaveHandler}
                    style={{width: 150}}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
}