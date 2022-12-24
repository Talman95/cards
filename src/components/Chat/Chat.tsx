import React, { FC, useEffect, useState } from 'react';

import MessageIcon from '@mui/icons-material/Message';
import { Badge, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

import { useActions } from '../../hooks/useActions';
import { selectors } from '../../store';

import { ChatModal } from './ChatModal/ChatModal';

export const Chat: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { createConnection, destroyConnection } = useActions();

  const messages = useSelector(selectors.chatSelectors.selectMessages);

  useEffect(() => {
    createConnection();

    return () => {
      destroyConnection();
    };
  }, []);

  const onMessageButtonClick = (): void => {
    setIsVisible(true);
  };
  const onCloseButtonClick = (): void => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible ? (
        <ChatModal onCloseButtonClick={onCloseButtonClick} messages={messages} />
      ) : (
        <IconButton
          onClick={onMessageButtonClick}
          size="large"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '50px',
            cursor: 'pointer',
          }}
        >
          <Badge badgeContent={4} color="primary">
            <MessageIcon fontSize="inherit" />
          </Badge>
        </IconButton>
      )}
    </div>
  );
};
