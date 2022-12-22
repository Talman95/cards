import React, { ChangeEvent, FC, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';

import { UpdatePackType } from '../../../api/packsAPI';
import { BottomNavigationButtons } from '../../../components/BottomNavigationButtons/BottomNavigationButtons';
import { modalType } from '../../../enums/modalType';
import { useAppSelector } from '../../../hooks/hooks';
import { useActions } from '../../../hooks/useActions';
import { convertFileToBase64 } from '../../../utils/convertFile';

const MAX_FILE_SIZE = 4000000;

export const PackModal: FC = () => {
  const { setModalClose, addPack, updatePack } = useActions();

  const type = useAppSelector(state => state.modal.type);
  const data = useAppSelector(state => state.modal.data) as UpdatePackType;

  const [name, setName] = useState(data?.name || '');
  const [cover, setCover] = useState(data?.deckCover);
  const [isPrivate, setIsPrivate] = useState(data?.isPrivate);

  const onUploadCoverClick = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < MAX_FILE_SIZE) {
        convertFileToBase64(file, (file64: string) => {
          setCover(file64);
        });
      } else {
        console.error('Error: ', 'Файл слишком большого размера');
      }
    }
  };

  const onSaveDataClick = async (): Promise<void> => {
    if (type === modalType.ADD_PACK) {
      await addPack({
        name,
        deckCover: cover,
        isPrivate,
      });
    }

    if (type === modalType.UPDATE_PACK) {
      await updatePack({
        _id: data?._id,
        name,
        deckCover: cover,
        isPrivate,
      });
    }

    setModalClose();
  };

  const onNameChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setName(e.currentTarget.value);
  };
  const onCloseModalClick = (): void => {
    setModalClose();
  };
  const onRemoveCoverClick = (): void => {
    setCover(null);
  };

  return (
    <>
      <TextField
        id={name}
        label="Name pack"
        variant="outlined"
        value={name}
        onChange={onNameChange}
        sx={{ marginBottom: '5px' }}
      />
      {cover && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ margin: '5px 0' }}
        >
          <img
            src={cover}
            alt="pack cover"
            loading="lazy"
            style={{ maxWidth: 200, maxHeight: 200, marginLeft: '24px' }}
          />
          <IconButton onClick={onRemoveCoverClick}>
            <CloseIcon />
          </IconButton>
        </Stack>
      )}
      <Button component="label" variant="contained" fullWidth sx={{ marginTop: '5px' }}>
        <input hidden accept={'image/*'} type="file" onChange={onUploadCoverClick} />
        Change cover
      </Button>
      <FormControlLabel
        label="Private pack?"
        control={
          <Checkbox
            checked={!!isPrivate}
            onChange={e => setIsPrivate(e.currentTarget.checked)}
          />
        }
      />
      <BottomNavigationButtons
        navigateBack={onCloseModalClick}
        clickSave={onSaveDataClick}
      />
    </>
  );
};
