import React, { FC, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

// import { Chat } from '../components/Chat/Chat';
import { Header } from '../components/Header/Header';
import { MessageSnackbar } from '../components/MessageSnackbar/MessageSnackbar';
import { useActions } from '../hooks/useActions';
import { Modals } from '../pages/Modals/Modals';
import { RoutesPage } from '../routes/RoutesPage';
import { selectors } from '../store';

const App: FC = () => {
  const { getAuthData } = useActions();

  const isInitialized = useSelector(selectors.appSelectors.selectIsInitialized);
  // const isLoggedIn = useSelector(selectors.authSelectors.selectIsLoggedIn);

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
