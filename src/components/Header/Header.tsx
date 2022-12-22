import React, { FC, MouseEvent, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { path } from '../../enums/path';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/useActions';

export const Header: FC = () => {
  const navigate = useNavigate();
  const { logout } = useActions();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const profile = useAppSelector(state => state.profile.profile);
  const status = useAppSelector(state => state.app.status);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const navigateToProfile = (): void => {
    navigate(path.PROFILE);
    handleClose();
  };
  const navigateToPacksList = (): void => {
    navigate(path.PACKS);
    handleClose();
  };
  const navigateToUsersPage = (): void => {
    navigate(path.USERS);
    handleClose();
  };
  const handleLogout = (): void => {
    logout();
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ height: '69px' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cards App
          </Typography>
          {isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h6"
                style={{
                  textOverflow: 'ellipsis',
                  maxWidth: '250px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {profile?.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                color="inherit"
              >
                <Avatar
                  sx={{ width: 45, height: 45 }}
                  alt={profile?.name}
                  src={profile?.avatar || ''}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
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
                <MenuItem onClick={navigateToPacksList}>Packs</MenuItem>
                <MenuItem onClick={navigateToUsersPage}>Users</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        {status === 'loading' && (
          <LinearProgress sx={{ position: 'absolute', top: '69px', left: 0, right: 0 }} />
        )}
      </AppBar>
    </Box>
  );
};
