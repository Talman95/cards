import React, { FC } from 'react';

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import { MessageType } from '../../../../types';

export const MessageItem: FC<{ message: MessageType }> = ({ message }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={message.user.name} src={message.user.avatar || message.user.name} />
      </ListItemAvatar>
      <ListItemText primary={message.user.name} secondary={message.message} />
    </ListItem>
  );
};
