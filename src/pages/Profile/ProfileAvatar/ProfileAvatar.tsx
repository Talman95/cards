import React, {ChangeEvent, FC, useState} from 'react';
import {Avatar, IconButton, Stack} from '@mui/material';
import {ProfileType} from "../../../api/authAPI";
import {PhotoCamera} from "@mui/icons-material";
import {useActions} from "../../../hooks/useActions";
import {convertFileToBase64} from "../../../utils/convertFile";

export const ProfileAvatar: FC<{ profile: ProfileType }> = ({profile}) => {
    const {updateProfile} = useActions()

    const [ava, setAva] = useState(profile.avatar)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setAva(file64)
                    updateProfile({avatar: file64})
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    return (
        <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'baseline'}
        >
            <Avatar
                sx={{width: 100, height: 100, marginLeft: '40px'}}
                alt={profile.name}
                src={ava}
            />
            <IconButton color={'primary'} aria-label={'upload picture'} component={'label'}>
                <input hidden accept={'image/*'} type={'file'} onChange={uploadHandler}/>
                <PhotoCamera/>
            </IconButton>
        </Stack>
    )
}
