import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { path } from '../../enums/path';
import { useActions } from '../../hooks/useActions';
import { allAuthActions, allProfileActions, profileSelectors } from '../../store';

import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';

const Profile: FC = () => {
  const navigate = useNavigate();

  const { logout } = useActions(allAuthActions);
  const { updateProfile } = useActions(allProfileActions);

  const profile = useSelector(profileSelectors.selectProfile);

  const [name, setName] = useState<string>(profile?.name || '');
  const [editMode, setEditMode] = useState(false);

  const logoutHandler = (): void => logout();
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };
  const onEditMode = (): void => setEditMode(true);
  const offEditMode = (): void => {
    updateProfile({ name });
    setEditMode(false);
  };
  const onEnterPressHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      offEditMode();
    }
  };
  const navigateToPacks = (): void => navigate(path.PACKS);

  if (!profile) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card
      style={{
        width: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <CardHeader title="Personal Information" />
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '280px',
          justifyContent: 'space-around',
        }}
      >
        <ProfileAvatar profile={profile} />
        {editMode ? (
          <TextField
            defaultValue={name}
            onBlur={offEditMode}
            onChange={changeNameHandler}
            autoFocus
            onKeyPress={onEnterPressHandler}
          />
        ) : (
          <CardActions>
            <Typography
              variant="h6"
              style={{
                textOverflow: 'ellipsis',
                maxWidth: '370px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                marginLeft: '24px',
              }}
            >
              {profile?.name}
            </Typography>
            <IconButton onClick={onEditMode}>
              <EditIcon />
            </IconButton>
          </CardActions>
        )}
        <Typography color="text.secondary">Email: {profile?.email}</Typography>
        <Typography color="text.secondary">
          Created public packs: {profile?.publicCardPacksCount}
        </Typography>
        <Button onClick={navigateToPacks}>Packs</Button>
        <Button variant="outlined" startIcon={<LogoutIcon />} onClick={logoutHandler}>
          Log out
        </Button>
      </CardContent>
    </Card>
  );
};

export default Profile;
