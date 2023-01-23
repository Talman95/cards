import React, { FC, useState } from 'react';

import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { path } from '../../../enums/path';
import { authSelectors } from '../../../store';

import { CheckEmail } from './CheckEmail/CheckEmail';
import { RecoveryPassword } from './RecoveryPassword/RecoveryPassword';

export const Forgot: FC = () => {
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);

  const [isSend, setIsSend] = useState(false);
  const [email, setEmail] = useState('');

  const handleSendMessage = (): void => setIsSend(true);
  const handleSetEmail = (email: string): void => setEmail(email);

  if (isLoggedIn) {
    return <Navigate to={path.PROFILE} />;
  }

  return (
    <Grid container justifyContent="center" style={{ maxWidth: '250px' }}>
      {isSend ? (
        <CheckEmail email={email} />
      ) : (
        <RecoveryPassword toSend={handleSendMessage} setEmail={handleSetEmail} />
      )}
    </Grid>
  );
};
