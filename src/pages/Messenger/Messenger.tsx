import { Box, TextField, IconButton, Avatar, InputAdornment } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import Loader from "../../components/Loader/Loader";
import { CREATE_CONVERSATION, FETCH_CONVERSATION, FETCH_CONVERSATION_MESSAGES, SEND_MESSAGE } from "../../endPoints";
import { getAPICall, postAPICall } from "../../apiService";
import ConversationsList from "../../components/ConversationsList/ConversationsList";
import { toast } from 'react-toastify';
import SearchInput from "../../components/SearchInput/SearchInput";
import UserList from "../../components/UserList/UserList";
import { useQuery } from "react-query";
import { IConversation, IUser } from "../../types";
import './Messenger.scss';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import EmojiModal from "../../components/EmojiModal/EmojiModal";

const Messenger = () => {
    const [chatMessages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [receiverDetail, setReceiverDetails] = useState<IUser>({} as IUser);
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [selectedConversation, setselectedConversation] = useState<any>({});
    const [selectedUserMessages, setSelectedUserMessages] = useState<any>([]);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [input, setInput] = useState<any>('');
    const wrapperRef = useRef(null);
    const isClickOutSide = useOutsideAlerter(wrapperRef);


    const [emojiModel, toggleEmojiModel] = useState<boolean>(false);
    const { error } = useQuery({
        enabled: conversationId !== null,
        refetchInterval: 5000,
        queryKey: ['messeger'],
        queryFn: () => getAPICall(
            `${FETCH_CONVERSATION_MESSAGES}/${conversationId}`, {}
        ),
        onSuccess: (data) => {
            setMessages(data.messages);
        }
    })

    const valueRef = useRef<HTMLInputElement>(null)

    const updateMessages = (msg: any) => {
        const tempMessage = JSON.parse(JSON.stringify(chatMessages));
        tempMessage.push(msg);
        setMessages(tempMessage)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData') || '{}') as IUser;
        setCurrentUser(user);
        getAllConversation(user.id)
    }, []);

    useEffect(() => {
        if (isClickOutSide) {
            toggleEmojiModel(false);
        }
    }, [isClickOutSide])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const conversationPlayload = {
            body: valueRef?.current?.value,
            sender: currentUser.id,
            receiver: receiverDetail._id || receiverDetail.id,
            conversation: selectedConversation._id
        }
        updateMessages(conversationPlayload);
        if (valueRef.current && currentUser.id) {
            sendMessage(conversationPlayload)
            valueRef.current.value = '';
            setInput('')
        }
    };

    const onUserClick = (userDetail: any, selectedConversation: any) => {
        setSelectedUserMessages([]);
        setReceiverDetails(userDetail);
        setselectedConversation(selectedConversation);
        setConversationId(selectedConversation._id);
    }

    const sendMessage = async (request: any) => {
        try {
            await postAPICall({
                baseUrl: SEND_MESSAGE,
                body: request
            })
        } catch (e) {
            console.log(e)
            toast("Unkown Error while fetching Messages ", { type: 'error' });
        }
        toggleEmojiModel(false);
    }

    const createConversation = async (user: IUser) => {
        const result = await postAPICall({
            baseUrl: CREATE_CONVERSATION,
            body: {
                users: [user.id, currentUser.id]
            }
        });
        setReceiverDetails(user);
        setselectedConversation(result);
        setConversationId(result._id);

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
        setSelectedUserMessages([]);
        let isConversationExit: boolean = false;
        conversations.forEach((convo: IConversation) => {
            const userId = [...convo.users.map((user) => user._id)];
            if (userId.includes(user.id)) {
                isConversationExit = true;
                setselectedConversation(convo);
                setConversationId(convo._id);
                setReceiverDetails(user);
                return;
            }
        })
        setInput('');
        if (!isConversationExit) {
            createConversation(user)
            return;
        }
    }

    const closeConversation = () => {
        getAllConversation(currentUser.id);
        setReceiverDetails({} as IUser);
        setConversationId(null);
    }

    const toggleEmoji = (evt: any) => {
        evt.preventDefault();
        toggleEmojiModel(!emojiModel)
    }


    return (
        <div className="messenger">
            {
                !(receiverDetail._id || receiverDetail.id) ? <div className="messenger-users">
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
                                        color="inherit" onClick={() => closeConversation()}>
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                                <div className="messager-chat-box-messages-list">
                                    <ChatMessages messages={[...selectedUserMessages, ...chatMessages]} receiverDetail={receiverDetail} currentUser={currentUser} />
                                </div>
                                <Box component="form" sx={{ mt: 1 }} className="messager-chat-box-messages-input" noValidate onSubmit={handleSubmit}>
                                    {
                                        emojiModel && <EmojiModal onEmojiClick={(emoji) => setInput(input + emoji)} closeModal={() => toggleEmojiModel(false)} />
                                    }
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="message"
                                        name="message"
                                        autoComplete="message"
                                        placeholder="Message"
                                        autoFocus
                                        value={input}
                                        onChange={(evt) => setInput(evt.target.value)}
                                        inputRef={valueRef}

                                    />

                                    <button className="emoji-button"
                                        onClick={toggleEmoji}

                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
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
    return messages.length ? <ul className="chat-messages">
        {messages.map((messageDetail: any, key: number) => <li key={key + '_messages'} className={messageDetail.sender == currentUser.id ? 'sent-by-you' : 'not-sent-by-you'}>

            {messageDetail.sender !== currentUser.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={receiverDetail?.firstName} src={receiverDetail.userImage} />}
            <span>{messageDetail.body}</span>
            {messageDetail.sender === currentUser.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={currentUser.firstName} src={currentUser.userImage} />}

        </li>)}
    </ul> : null
}
