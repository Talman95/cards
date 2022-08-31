import React from 'react';
import {AppBar, Avatar, Box, IconButton, LinearProgress, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppDispatch, useAppSelector} from "../../../c0-common/c1-hooks/hooks";
import {useNavigate} from "react-router-dom";
import {logout} from "../../../c2-features/f1-auth/a1-login/l2-bll/authReducer";

export const Header = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.profile.profile)
    const status = useAppSelector(state => state.app.status)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const navigateToProfile = () => {
        navigate('/profile')
        handleClose()
    }
    const logoutHandler = () => {
        dispatch(logout())
        handleClose()
    }
    const navigateToPacksList = () => {
        navigate('/packs')
        handleClose()
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Cards App
                    </Typography>
                    {isLoggedIn && (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant="h6" style={{
                                textOverflow: 'ellipsis',
                                maxWidth: '250px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}>
                                {profile?.name}
                            </Typography>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar
                                    sx={{width: 45, height: 45}}
                                    alt={profile?.name}
                                    src={profile?.avatar || ''}
                                />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
                                <MenuItem onClick={navigateToPacksList}>Packs list</MenuItem>
                                <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
        </Box>
    )
};