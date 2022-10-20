import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import {useActions} from "../../hooks/useActions";
import {PATH} from "../../routes/RoutesPage";
import {ProfileAvatar} from "./ProfileAvatar/ProfileAvatar";

export const Profile: FC = () => {
    const navigate = useNavigate()
    const {logout, updateProfile} = useActions()

    const profile = useAppSelector(state => state.profile.profile)

    const [name, setName] = useState<string>(profile?.name || '')
    const [editMode, setEditMode] = useState(false)

    const logoutHandler = () => logout()
    const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        updateProfile({name: name})
        setEditMode(false)
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }
    const navigateToPacks = () => navigate(PATH.PACKS)

    if (!profile) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <Card style={{width: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CardHeader title={'Personal Information'}/>
            <CardContent style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '280px',
                justifyContent: 'space-around',
            }}>
                <ProfileAvatar profile={profile}/>
                {editMode
                    ?
                    <TextField
                        defaultValue={name}
                        onBlur={offEditMode}
                        onChange={changeNameHandler}
                        autoFocus
                        onKeyPress={onEnterPressHandler}
                    />
                    :
                    <CardActions>
                        <Typography variant={'h6'} style={{
                            textOverflow: 'ellipsis',
                            maxWidth: '370px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            marginLeft: '24px',
                        }}>
                            {profile?.name}
                        </Typography>
                        <IconButton onClick={onEditMode}>
                            <EditIcon/>
                        </IconButton>
                    </CardActions>
                }
                <Typography color={'text.secondary'}>
                    Email: {profile?.email}
                </Typography>
                <Typography color={'text.secondary'}>
                    Created public packs: {profile?.publicCardPacksCount}
                </Typography>
                <Button onClick={navigateToPacks}>
                    Packs
                </Button>
                <Button
                    variant={'outlined'}
                    startIcon={<LogoutIcon/>}
                    onClick={logoutHandler}
                >
                    Log out
                </Button>
            </CardContent>
        </Card>
    )
}