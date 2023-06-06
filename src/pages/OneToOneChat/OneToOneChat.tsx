import { Box, Avatar, IconButton, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import EmojiModal from "../../components/EmojiModal/EmojiModal";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import './OneToOneChat.scss'
import { useState, useRef, useEffect } from "react";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { IUser } from "../../types";
import { toast } from "react-toastify";
import { getAPICall, postAPICall } from "../../apiService";
import { FETCH_CONVERSATION_MESSAGES, SEND_MESSAGE } from "../../endPoints";
import { AppRouteContant } from "../../constants";
import { useQuery } from "@apollo/client";
import * as reactQuery from "react-query";

import { GET_USER_BY_ID } from "../../gqlOperations/queries";
import { useAppStore } from "../../store/zustand";
const OneToOneChat = () => {
    const [chatMessages, setMessages] = useState<any[]>([]);
    const [selectedConversation, setselectedConversation] = useState<any>({});
    const [input, setInput] = useState<any>('');
    const wrapperRef = useRef(null);
    const chatRef = useRef<any>(null);
    const isClickOutSide = useOutsideAlerter(wrapperRef);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()
    const { id } = useParams(); // Access the route parameter
    const { data: receiver, loading: profileLoading } = useQuery(GET_USER_BY_ID, {
        variables: { userid: id },
        fetchPolicy: 'no-cache'
    });

    const { error } = reactQuery.useQuery({
        enabled: (id ? true : false && loading),
        refetchInterval: 5000,
        queryKey: ['messeger'],
        queryFn: () => getAPICall(
            `${FETCH_CONVERSATION_MESSAGES}/${id}`, {}
        ),
        onSuccess: (data: any) => {
            setMessages(data.messages);
            setselectedConversation(data._id);
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }

        }
    })

    const valueRef = useRef<HTMLInputElement>(null)
    const [emojiModel, toggleEmojiModel] = useState<boolean>(false);
    const userData = useAppStore((state: any) => state?.userData);
    useEffect(() => {
        if (isClickOutSide) {
            toggleEmojiModel(false);
        }
    }, [isClickOutSide]);

    const updateMessages = (msg: any) => {
        const tempMessage: any[] = [...chatMessages]
        tempMessage.push(msg);
        setMessages(tempMessage)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const conversationPlayload = {
            body: valueRef?.current?.value,
            sender: userData.id,
            receiver: receiver?.user?.id,
            conversation: selectedConversation
        }
        updateMessages(conversationPlayload);
        if (valueRef.current && userData.id) {
            sendMessage(conversationPlayload)
            valueRef.current.value = '';
            setInput('')
        }
    };

    const sendMessage = async (request: any) => {
        setLoading(true);
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
        setLoading(true);

    }

    const closeConversation = () => {
        navigate(-1)
    }


    const toggleEmoji = (evt: any) => {
        evt.preventDefault();
        toggleEmojiModel(!emojiModel)
    }

    return <div className="messager-chat-box">
        <Box sx={{
            width: "100%",
            justifyContent: "space-between",
            height: '80px', display: 'flex'
        }}>
            <Link to={`/${receiver?.user?.id}`} style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                <Avatar alt={receiver?.user?.firstName} src={receiver?.user?.userImage} /> <span className="text-user-name"><b>{receiver?.user?.firstName} {receiver?.user?.lastName}</b></span>
            </Link>

            <IconButton size="large"
                color="inherit" onClick={() => closeConversation()}>
                <CancelIcon />
            </IconButton>
        </Box>
        <div className="messager-chat-box-messages-list">
            <ChatMessages messages={[...chatMessages]} chatRef={chatRef} receiver={receiver?.user} userData={userData} />
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
    </div>
}

export default OneToOneChat;



const ChatMessages = ({ messages = [], receiver, userData, chatRef }: { messages: any[], receiver: IUser, userData: IUser, chatRef: any }) => {
    return messages.length ? <ul className="chat-messages" ref={chatRef}>
        {messages.map((messageDetail: any, key: number) => <li key={key + '_messages'} className={messageDetail.sender == userData?.id ? 'sent-by-you' : 'not-sent-by-you'}>

            {messageDetail?.sender !== userData?.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={receiver?.firstName} src={receiver?.userImage} />}
            <span>{messageDetail.body}</span>
            {messageDetail?.sender === userData?.id && <Avatar sx={{ textTransform: 'capitalize' }} alt={userData?.firstName} src={userData?.userImage} />}

        </li>)}
    </ul> : null
}