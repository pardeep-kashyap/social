import { Box, TextField, IconButton, Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import CancelIcon from '@mui/icons-material/Cancel';
import Loader from "../../components/Loader/Loader";
import { CREATE_CONVERSATION, FETCH_CONVERSATION, FETCH_CONVERSATION_MESSAGES, SEND_MESSAGE } from "../../endPoints";
import { getAPICall, postAPICall } from "../../apiService";
import ConversationsList from "../../components/ConversationsList/ConversationsList";
import { toast } from 'react-toastify';

import './Messenger.scss';
import SearchInput from "../../components/SearchInput/SearchInput";
import UserList from "../../components/UserList/UserList";

const socket = io('http://localhost:5000/');

export interface IUser {
    id: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userImage: string;
    token?: string
}
export interface IConversation {
    messages: any[],
    users: IUser[],
    _id: string
}
const Messenger = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatMessages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMsg] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [receiverDetail, setReceiverDetails] = useState<IUser>(null as IUser);
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [selectedConversation, setselectedConversation] = useState<any>({});
    const [selectedUserMessages, setSelectedUserMessages] = useState<any>([]);
    const [messageLoader, setMessageLoader] = useState<boolean>(true);
    const [input, setInput] = useState<any>('');

    const valueRef = useRef<HTMLInputElement>(null)

    const updateMessages = (msg: any) => {
        const tempMessage = JSON.parse(JSON.stringify(chatMessages));
        tempMessage.push(msg);
        setMessages(tempMessage)
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData') || '{}') as IUser;
        setCurrentUser(user);
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

        getAllConversation(user.id)

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
        console.log();
        const conversationPlayload = {
            body: valueRef?.current?.value,
            sender: currentUser.id,
            receiver: receiverDetail._id,
            conversation: selectedConversation._id
        }
        if (valueRef.current && currentUser.id) {
            sendMessage(conversationPlayload)
            socket.emit('message', conversationPlayload);
            valueRef.current.value = '';

        }
    };

    const onUserClick = (userDetail: any, selectedConversation: any) => {
        setSelectedUserMessages([]);
        setReceiverDetails(userDetail);
        setselectedConversation(selectedConversation);
        getAllMessages(selectedConversation._id)
    }


    const sendMessage = async (request: any) => {
        try {
            const result = await postAPICall({
                baseUrl: SEND_MESSAGE,
                body: request
            })
        } catch (e) {
            console.log(e)
            toast("Unkown Error while fetching Messages ", { type: 'error' });
        }
    }


    const getAllMessages = async (id: string) => {
        setMessageLoader(true);
        try {
            const result = await getAPICall(
                `${FETCH_CONVERSATION_MESSAGES}/${id}`, {}
            )
            setSelectedUserMessages(result.messages);
        } catch (e) {
            console.log(e);
            toast("Unkown Error while fetching messages ", { type: 'error' });
        }
        setMessageLoader(false);
    }


    const createConversation = async (user: IUser) => {
        const result = await postAPICall({
            baseUrl: CREATE_CONVERSATION,
            body: {
                users: [user.id, currentUser.id]
            }
        });
        setselectedConversation(result);
        getAllMessages(result._id)
    }

    const getAllConversation = async (id: string) => {
        setLoading(true);
        try {
            const result = await getAPICall(
                `${FETCH_CONVERSATION}/${id}`, {}
            )
            setConversations(result);

        } catch (e) {
            console.log(e);
            toast("Unkown Error while fetching conversation ", { type: 'error' });
        }
        setLoading(false);
    }

    if (loading) return (<Loader />)

    const onTextChange = (evt: any) => {
        if (evt && evt.target) {
            setInput(evt.target.value);
        }
    }

    const OnConversationCreation = (user: IUser) => {
        console.log("user", user);
        console.log("conversations", conversations);
        let isConversationExit: boolean = false;
        conversations.forEach((convo: IConversation) => {
            const userId = [...convo.users.map((user) => user._id)];
            if (!userId.includes(user.id)) {
                isConversationExit = true;
                setselectedConversation(convo);
                getAllMessages(convo._id)
            }
        })
        setSelectedUserMessages([]);
        setReceiverDetails(user);
        if (!isConversationExit) {
            createConversation(user)
        }

    }

    return (
        <div className="messenger">

            {
                !receiverDetail ? <div className="messenger-users">
                    <SearchInput onChange={onTextChange} value={input} />
                    {
                        input.length > 0 ? <UserList selectedUser={currentUser} param={input} onClick={OnConversationCreation} /> : <ConversationsList conversations={conversations} onClick={onUserClick} selectedUser={currentUser} />
                    }

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
                                        <Avatar alt={receiverDetail?.firstName} src={receiverDetail.userImage} /> <span className="text-user-name">{receiverDetail?.firstName} {receiverDetail?.lastName}</span>
                                    </Box>
                                    <IconButton size="large"
                                        color="inherit" onClick={() => setReceiverDetails(null)}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                                <div className="messager-chat-box-messages-list">

                                    <ChatMessages messages={[...selectedUserMessages, ...chatMessages]} receiverDetail={receiverDetail} currentUser={currentUser} />
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


const ChatMessages = ({ messages = [], receiverDetail, currentUser }: { messages: any[], receiverDetail: IUser, currentUser: IUser }) => {
    console.log("messages", messages);

    return messages.length ? <ul className="chat-messages">
        {messages.map((messageDetail: any, key: number) => <li key={key + '_messages'} className={messageDetail.sender == currentUser.id ? 'sent-by-you' : 'not-sent-by-you'}>

            {messageDetail.sender !== currentUser.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={receiverDetail?.firstName} src={receiverDetail.userImage} />}
            <span>{messageDetail.body}</span>
            {messageDetail.sender === currentUser.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={currentUser.firstName} src={receiverDetail.userImage} />}

        </li>)}
    </ul> : null
}




