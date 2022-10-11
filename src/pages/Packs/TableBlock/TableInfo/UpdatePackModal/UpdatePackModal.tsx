import React, {ChangeEvent, FC, useState} from 'react';
import {PackType, UpdatePackType} from "../../../../../api/packsAPI";
import {Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {convertFileToBase64} from "../../../../../utils/convertFile";

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
    const [cover, setCover] = useState<string | null>(pack?.deckCover || null)
    const [isPrivate, setIsPrivate] = useState(pack?.private)

    if (!pack) {
        return <div>!</div>
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setCover(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }
    const removeCover = () => {
        setCover(null)
    }
    const clickSaveHandler = () => {
        const updatedPack = {
            _id: pack._id,
            name,
            deckCover: cover,
            isPrivate,
        }
        saveData(updatedPack)
    }

    return (
        <Box sx={style}>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <Typography id={'title'} variant={'h6'} component={'h2'}>
                        Update pack
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={navigateBack}>
                        <CloseIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <TextField
                id={name}
                label={'Name pack'}
                variant={'outlined'}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                sx={{marginBottom: '5px'}}
            />
            {cover &&
                <Stack
                    direction={'row'}
                    justifyContent={'center'}
                    alignItems={'flex-start'}
                    sx={{margin: '5px 0'}}
                >
                    <img
                        src={cover}
                        alt={'pack cover'}
                        loading={'lazy'}
                        style={{maxWidth: 200, maxHeight: 200, marginLeft: '24px'}}
                    />
                    <IconButton onClick={removeCover}>
                        <CloseIcon/>
                    </IconButton>
                </Stack>
            }
            <Button
                component={'label'}
                variant={"contained"}
                fullWidth
                sx={{marginTop: '5px'}}
            >
                <input hidden accept={'image/*'} type={'file'} onChange={uploadHandler}/>
                Change cover
            </Button>
            <FormControlLabel label={'Private pack?'} control={
                <Checkbox
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.currentTarget.checked)}
                />}
            />
            <Stack direction={'row'} spacing={2} style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button
                    variant={'outlined'}
                    onClick={navigateBack}
                    style={{width: 150}}
                >
                    Cancel
                </Button>
                <Button
                    variant={'contained'}
                    onClick={clickSaveHandler}
                    style={{width: 150}}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    )
}