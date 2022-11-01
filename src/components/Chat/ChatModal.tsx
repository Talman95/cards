import React, {FC} from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    IconButton, List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {MessageType} from "../../api/chatAPI";
import {useAppSelector} from "../../hooks/hooks";

type PropsType = {
    onCloseButtonClick: () => void
    messages: MessageType[]
}

export const ChatModal: FC<PropsType> = ({onCloseButtonClick, messages}) => {

    const profile = useAppSelector(state => state.profile.profile)

    return (
        <Card sx={{position: 'absolute', bottom: 0, right: '30px', width: 400, height: 500}}>
            <CardHeader
                avatar={
                    <Avatar src={profile?.avatar || ''}/>
                }
                style={{backgroundColor: '#1976d2'}}
                action={
                    <IconButton>
                        <CloseIcon onClick={onCloseButtonClick}/>
                    </IconButton>
                }
                title={profile?.name}
            />
            <CardContent>
                <List sx={{width: '100%', height: 400, bgcolor: 'background.paper', overflowY: 'auto'}}>
                    {messages.map((m) =>
                        <MessageItem message={m} key={m._id}/>
                    )}
                </List>
            </CardContent>
        </Card>
    )
}

export const MessageItem: FC<{ message: MessageType }> = ({message}) => {
    return (
        <ListItem alignItems={'flex-start'}>
            <ListItemAvatar>
                <Avatar alt={message.user.name} src={message.user.avatar || message.user.name}/>
            </ListItemAvatar>
            <ListItemText primary={message.user.name} secondary={message.message}/>
        </ListItem>
    )
}