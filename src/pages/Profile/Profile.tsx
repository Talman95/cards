import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import {useActions} from "../../hooks/useActions";
import {PATH} from "../../components/routes/RoutesPage";

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
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        updateProfile({name: name})
        setEditMode(false)
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }
    const navigateToPacks = () => {
        navigate(PATH.PACKS)
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
                <Avatar
                    sx={{width: 100, height: 100}}
                    alt={profile?.name}
                    src={profile?.avatar || ''}
                />
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
                        <Typography variant="h6" style={{
                            textOverflow: 'ellipsis',
                            maxWidth: '370px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                        }}>
                            {profile?.name}
                        </Typography>
                        <IconButton onClick={onEditMode}>
                            <EditIcon/>
                        </IconButton>
                    </CardActions>
                }
                <Typography color="text.secondary">{profile?.email}</Typography>
                <Button onClick={() => navigateToPacks()}>
                    Packs
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<LogoutIcon/>}
                    onClick={logoutHandler}
                >
                    Log out
                </Button>
            </CardContent>
        </Card>
    )
}