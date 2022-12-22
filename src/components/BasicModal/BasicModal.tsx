import React, { FC, ReactElement } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

import { useActions } from '../../hooks/useActions';

type PropsType = {
  type: null | string;
  children: ReactElement;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

export const BasicModal: FC<PropsType> = ({ type, children }) => {
  const { setModalClose } = useActions();

  const onCloseClick = (): void => {
    setModalClose();
  };

  return (
    <Modal open={!!type} onClose={onCloseClick}>
      <Box sx={style}>
        <Grid container alignItems="center" style={{ marginBottom: '10px' }}>
          <Grid item xs>
            <Typography id="title" variant="h6" component="h2">
              {type}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        {children}
      </Box>
    </Modal>
  );
};
