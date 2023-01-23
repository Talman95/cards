import React, { FC, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

// import { Chat } from '../components/Chat/Chat';
import { Header, MessageSnackbar } from '../components';
import { useActions } from '../hooks/useActions';
import { Modals } from '../pages/Modals/Modals';
import { RoutesPage } from '../routes/RoutesPage';
import { allAuthActions, appSelectors } from '../store';

const App: FC = () => {
  const { getAuthData } = useActions(allAuthActions);

  const isInitialized = useSelector(appSelectors.selectIsInitialized);
  // const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);

  useEffect(() => {
    getAuthData();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <MessageSnackbar />
      <Header />
      <RoutesPage />
      {/* {isLoggedIn && <Chat />} */}
      <Modals />
    </div>
  );
};

export default App;
