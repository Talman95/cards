import React, {FC, useEffect} from 'react';
import {Avatar, Box, CircularProgress, IconButton, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useActions} from "../../../hooks/useActions";
import {useAppSelector} from "../../../hooks/hooks";
import CloseIcon from "@mui/icons-material/Close";

type PropsType = {
    id: string
    navigateBack: () => void
}

export const ViewedUser: FC<PropsType> = ({id, navigateBack}) => {
    const {getUserData, removeUsersData} = useActions()

    const user = useAppSelector(state => state.users.viewedUser)

    useEffect(() => {
        if (!id) return

        getUserData(id)

        return () => {
            removeUsersData()
        }
    }, [])

    if (!user) {
        return <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress/>
        </Box>
    }

    return (
        <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Box style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                <IconButton onClick={navigateBack}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Typography id={'title'} variant={'h6'} component={'h2'}>
                User Information
            </Typography>
            <Avatar
                sx={{width: 120, height: 120}}
                alt={user.name}
                src={user.avatar || ''}
            />
            <Box>
                <Typography variant={'h6'} style={{
                    textOverflow: 'ellipsis',
                    maxWidth: '370px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}>
                    {user.name}
                </Typography>
            </Box>
            <Typography color={'text.secondary'}>
                Email: {user.email}
            </Typography>
            <Typography color={'text.secondary'}>
                Created: {new Date(user.created).toLocaleString()}
                <Typography color={'text.secondary'}>
                    Last updated: {new Date(user.updated).toLocaleString()}
                </Typography>
            </Typography>
            <Typography color={'text.secondary'}>
                Created public packs: {user.publicCardPacksCount}
            </Typography>
            <Typography color={'text.secondary'} style={{alignItems: 'center'}}>
                Verified: {user.verified &&
                <CheckCircleIcon fontSize={'small'} color={'primary'}/>}
            </Typography>
        </Box>
    )
}