import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { CREATE_CONVERSATION, FETCH_CONVERSATION, FETCH_CONVERSATION_MESSAGES, SEND_MESSAGE } from "../../endPoints";
import { getAPICall, postAPICall } from "../../apiService";
import ConversationsList from "../../components/ConversationsList/ConversationsList";
import { toast } from 'react-toastify';
import SearchInput from "../../components/SearchInput/SearchInput";
import UserList from "../../components/UserList/UserList";
import { IConversation, IUser } from "../../types";
import './Messenger.scss';
import { useNavigate } from "react-router-dom";

const Messenger = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [input, setInput] = useState<any>('');

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData') || '{}') as IUser;
        setCurrentUser(user);
        getAllConversation(user.id)
    }, []);


    const onUserClick = (userDetail: any) => {
        navigate(`/chat/${userDetail._id}`);
    }


    const openConversation = async (user: IUser) => {
        await postAPICall({
            baseUrl: CREATE_CONVERSATION,
            body: {
                users: [user.id, currentUser.id]
            }
        });
        navigate(`/chat/${user.id}`);
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

    return (
        <div className="messenger">
            <SearchInput onChange={onTextChange} value={input} />
            {
                input.length > 0 ? <UserList selectedUser={currentUser} param={input} onClick={openConversation} /> : <ConversationsList conversations={conversations} onClick={onUserClick} selectedUser={currentUser} />
            }

        </div >
    )
}
export default Messenger;
