import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Checkbox, FormControlLabel, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import {AddPackParamsType} from "../../../../api/packsAPI";
import CloseIcon from "@mui/icons-material/Close";
import {convertFileToBase64} from "../../../../utils/convertFile";
import {BottomNavigationButtons} from "../../../../components/BottomNavigationButtons/BottomNavigationButtons";

type AddPackModalType = {
    onCloseModalClick: () => void
    onSaveDataHandler: (data: AddPackParamsType) => void
}

export const AddPackModal: FC<AddPackModalType> = (
    {
        onCloseModalClick,
        onSaveDataHandler,
    }
) => {

    const [name, setName] = useState('')
    const [cover, setCover] = useState<string | null>(null)
    const [isPrivate, setIsPrivate] = useState(false)

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
    const onSavePackClick = () => {
        const pack = {
            name,
            deckCover: cover,
            isPrivate,
        }
        onSaveDataHandler(pack)
    }

    return (
        <>
            <Grid container alignItems={'center'}>
                <Grid item xs>
                    <Typography id={'title'} variant={'h6'} component={'h2'}>
                        Add new pack
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={onCloseModalClick}>
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
                        style={{maxWidth: 200, maxHeight: 200}}
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
                Add pack cover
            </Button>
            <FormControlLabel label="Private pack?" control={
                <Checkbox
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.currentTarget.checked)}
                />}
            />
            <BottomNavigationButtons navigateBack={onCloseModalClick} clickSave={onSavePackClick}/>
        </>
    )
}