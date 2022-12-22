import React, { ChangeEvent, FC, useState } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import { Avatar, IconButton, Stack } from '@mui/material';

import { ProfileType } from '../../../api/authAPI';
import { useActions } from '../../../hooks/useActions';
import { convertFileToBase64 } from '../../../utils/convertFile';

const MAX_FILE_SIZE = 4000000;

export const ProfileAvatar: FC<{ profile: ProfileType }> = ({ profile }) => {
  const { updateProfile } = useActions();

  const [ava, setAva] = useState(profile.avatar);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < MAX_FILE_SIZE) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64);
          updateProfile({ avatar: file64 });
        });
      } else {
        console.error('Error: ', 'Файл слишком большого размера');
      }
    }
  };

  return (
    <Stack direction="row" justifyContent="center" alignItems="baseline">
      <Avatar
        sx={{ width: 100, height: 100, marginLeft: '40px' }}
        alt={profile.name}
        src={ava}
      />
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept={'image/*'} type="file" onChange={uploadHandler} />
        <PhotoCamera />
      </IconButton>
    </Stack>
  );
};
