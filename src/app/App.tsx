import React, { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';

// import { Chat } from '../components/Chat/Chat';
import { Header, MessageSnackbar } from '../components';
import { Loader } from '../components/Loader/Loader';
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
    return <Loader />;
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
