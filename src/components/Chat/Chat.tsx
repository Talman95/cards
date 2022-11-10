import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/hooks";
import {useActions} from "../../hooks/useActions";
import {Badge, IconButton} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import {ChatModal} from "./ChatModal/ChatModal";

export const Chat = () => {
    const [isVisible, setIsVisible] = useState(false)

    const {createConnection, destroyConnection} = useActions()

    const messages = useAppSelector(state => state.chat.messages)

    useEffect(() => {
        createConnection()

        return () => {
            destroyConnection()
        }
    }, [])

    const onMessageButtonClick = () => {
        setIsVisible(true)
    }
    const onCloseButtonClick = () => {
        setIsVisible(false)
    }

    return (
        <>
            {isVisible
                ?
                <ChatModal onCloseButtonClick={onCloseButtonClick} messages={messages}/>
                :
                <IconButton onClick={onMessageButtonClick} size={'large'}
                            style={{position: 'absolute', bottom: '10px', right: '50px', cursor: 'pointer'}}>
                    <Badge badgeContent={4} color={'primary'}>
                        <MessageIcon fontSize="inherit"/>
                    </Badge>
                </IconButton>
            }
        </>
    )
}

