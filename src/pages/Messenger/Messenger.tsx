import { Box, TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import './Messenger.css';
import { useQuery } from "@apollo/client";
import { GET_ALL_USER } from "../../gqlOperations/queries";
import CancelIcon from '@mui/icons-material/Cancel';
import Loader from "../../components/Loader/Loader";
const socket = io('http://192.168.1.6:5000/');

const Messenger = () => {
    const { data, error, loading } =
        useQuery(GET_ALL_USER);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatMessages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMsg] = useState<any>();
    const [receiverDetail, setReceiverDetails] = useState<any>();
    const [currentUser, setCurrentUser] = useState<any>();
    const valueRef = useRef<HTMLInputElement>(null)

    const updateMessages = (msg: any) => {
        const tempMessage = JSON.parse(JSON.stringify(chatMessages));
        tempMessage.push(msg);
        setMessages(tempMessage)
    }


    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('userData') || '{}'));
        socket.on('connect', () => {
            console.log("connect");
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('message', (newMessage) => {
            setNewMsg(newMessage)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    useEffect(() => {
        if (newMessage) {
            updateMessages(newMessage);
        }
    }, [newMessage])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (valueRef.current) {
            socket.emit('message', {
                message: valueRef?.current?.value,
                sentBy: currentUser.id,
                receiverId: receiverDetail.id
            });
            valueRef.current.value = '';

        }
    };

    const onUserClick = (userDetail: any) => {
        setReceiverDetails(userDetail)
    }

    if (loading) return (<Loader />)

    return (
        <div className="messenger">
            {
                !receiverDetail ? <div className="messenger-users">
                    <UserList {...data} onClick={onUserClick} selectedUser={receiverDetail} />
                </div> :
                    <div className="messager-chat-box">
                        {
                            receiverDetail && <>
                                <Box sx={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                    height: '80px', display: 'flex'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                                        <Avatar alt={receiverDetail?.firstName} src="/static/images/avatar/1.jpg" /> <span className="text-user-name">{receiverDetail?.firstName} {receiverDetail?.lastName}</span>
                                    </Box>
                                    <IconButton size="large"
                                        color="inherit" onClick={() => setReceiverDetails(null)}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>


                                <div className="messager-chat-box-messages-list">
                                    <ChatMessages messages={chatMessages} receiverDetail={receiverDetail} currentUser={currentUser} />
                                </div>
                                <Box component="form" sx={{ mt: 1 }} className="messager-chat-box-messages-input" noValidate onSubmit={handleSubmit}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="message"
                                        name="message"
                                        autoComplete="message"
                                        placeholder="Message"
                                        autoFocus
                                        inputRef={valueRef}
                                    />

                                    <IconButton
                                        color="primary"
                                        type="submit"

                                    >
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                            </>
                        }
                    </div>
            }


        </div >
    )
}
export default Messenger;


const ChatMessages = ({ messages = [], receiverDetail, currentUser }: { messages: any[], receiverDetail: any, currentUser: any }) => {
    return messages.length ? <ul className="chat-messages">
        {messages.map((messageDetail: any, key: number) => <li key={key + '_messages'} className={messageDetail.sentBy == currentUser.id ? 'sent-by-you' : 'not-sent-by-you'}>

            {messageDetail.sentBy !== currentUser.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={receiverDetail?.firstName} src="/static/images/avatar/1.jpg" />}
            <span>{messageDetail.message}</span>
            {messageDetail.sentBy === currentUser.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={currentUser.firstName} src="/static/images/avatar/1.jpg" />}

        </li>)}
    </ul> : null
}



const UserList = ({ users = [], onClick, selectedUser }: { users: any[], onClick: any, selectedUser: any }) => {
    return users.length ? <div className="chat-users">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {users.map((user: any, key: number) => <ListItem sx={{ backgroundColor: selectedUser?.id === user?.id ? 'lightgray' : '', cursor: 'pointer' }} alignItems="flex-start" onClick={() => onClick(user)}>
                <ListItemAvatar>
                    <Avatar alt={user.firstName} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={user.firstName + ' ' + user.lastName}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Message (1)
                            </Typography>

                        </React.Fragment>
                    }
                >
                </ListItemText>
            </ListItem>)}
        </List>
    </div> : null
}