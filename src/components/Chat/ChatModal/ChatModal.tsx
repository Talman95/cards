import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
  List,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { useActions } from '../../../hooks/useActions';
import { selectors } from '../../../store';
import { MessageType } from '../../../types';

import { MessageItem } from './MessageItem/MessageItem';

type PropsType = {
  onCloseButtonClick: () => void;
  messages: MessageType[];
};

export const ChatModal: FC<PropsType> = ({ onCloseButtonClick, messages }) => {
  const [message, setMessage] = useState('');

  const { sentMessage } = useActions();

  const profile = useSelector(selectors.profileSelectors.selectProfile);

  const onMessageTextChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setMessage(e.currentTarget.value);
  };
  const onKeyUpEnter = (
    e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    if (e.key === 'Enter') {
      onSendMessageClick();
    }
  };
  const onSendMessageClick = (): void => {
    const trimMessage = message.trim();

    if (trimMessage !== '') {
      sentMessage(trimMessage);
      setMessage('');
    }
  };

  return (
    <Card
      sx={{ position: 'absolute', bottom: 0, right: '30px', width: 400, height: 500 }}
    >
      <CardHeader
        avatar={<Avatar src={profile?.avatar || ''} />}
        style={{ backgroundColor: '#1976d2' }}
        action={
          <IconButton>
            <CloseIcon onClick={onCloseButtonClick} />
          </IconButton>
        }
        title={profile?.name}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: 400 }}>
        <List
          sx={{
            width: '100%',
            height: 300,
            bgcolor: 'background.paper',
            overflowY: 'auto',
            flex: '1 0 auto',
          }}
        >
          {messages.map(m => (
            <MessageItem message={m} key={m._id} />
          ))}
        </List>
        <InputBase
          style={{
            width: '100%',
            padding: '5px 10px 5px 18px',
            background: '#efefef',
            flex: '1 0 auto',
          }}
          placeholder="Start to type..."
          value={message}
          onKeyUp={onKeyUpEnter}
          onChange={onMessageTextChange}
          endAdornment={
            <IconButton onClick={onSendMessageClick} disabled={!message}>
              <SendIcon fontSize="inherit" color={message ? 'primary' : undefined} />
            </IconButton>
          }
        />
      </CardContent>
    </Card>
  );
};
