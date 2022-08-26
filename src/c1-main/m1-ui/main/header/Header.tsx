import React from 'react';
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useAppSelector} from "../../../../c0-common/c1-hooks/hooks";

export const Header = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const name = useAppSelector(state => state.profile.profile?.name)
    const avatar = useAppSelector(state => state.profile.profile?.avatar)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
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
                        <div>
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
                                    alt={name}
                                    src={avatar || ''}
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
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
};

// <div className={s.header}>
//     <NavLink to={PATH.LOGIN}>LOGIN</NavLink>
//     <NavLink to={PATH.REGISTER}>REGISTER</NavLink>
//     <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
//     <NavLink to={PATH.FORGOT_PASSWORD}>FORGOT PASSWORD</NavLink>
//     <NavLink to={PATH.SET_NEW_PASSWORD}>SET NEW PASSWORD</NavLink>
//     <NavLink to={PATH.TEST}>TEST</NavLink>
// </div>