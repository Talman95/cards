import React, { FC } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { SnackbarStatus } from '../../enums/snackbarStatus';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/useActions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const MessageSnackbar: FC = () => {
  const { setAppMessage } = useActions();

  const message = useAppSelector(state => state.app.message);
  const result: SnackbarStatus = useAppSelector(state => state.app.result);

  const isOpen = message !== null;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setAppMessage({ result, message: null });
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={result}>
        {message}
      </Alert>
    </Snackbar>
  );
};
