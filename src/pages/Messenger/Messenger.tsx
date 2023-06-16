import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import { CREATE_CONVERSATION, FETCH_CONVERSATION } from "../../endPoints";
import { getAPICall, postAPICall } from "../../apiService";
import ConversationsList from "../../components/ConversationsList/ConversationsList";
import { toast } from 'react-toastify';
import SearchInput from "../../components/SearchInput/SearchInput";
import UserList from "../../components/UserList/UserList";
import { IConversation, IUser } from "../../types";
import './Messenger.scss';
import { useNavigate } from "react-router-dom";
import * as reactQuery from "react-query";
import { useAppStore } from "../../store/zustand";

const Messenger = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [input, setInput] = useState<any>('');
    const userData = useAppStore((state: any) => state?.userData);

    reactQuery.useQuery({
        enabled: !!userData.id,
        refetchInterval: 10000,
        queryKey: ['conversation'],
        queryFn: () => getAPICall(
            `${FETCH_CONVERSATION}/${userData.id}`, {}
        ),
        onSuccess: (result: any) => {
            setLoading(false);
            setConversations(result);
        },
        onError: () => {
            toast("Unkown Error while fetching conversation ", { type: 'error' });
        }
    })

    const navigate = useNavigate();

    const onUserClick = (userDetail: any, conversation: IConversation) => {
        navigate(`/chat/${userDetail._id}/${conversation._id}`);
    }

    const openConversation = async (user: IUser) => {
        await postAPICall({
            baseUrl: CREATE_CONVERSATION,
            body: {
                users: [user.id, userData.id]
            }
        });
        navigate(`/chat/${user.id}`);
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
                input.length > 0 ? <UserList selectedUser={userData} param={input} onClick={openConversation} /> : <ConversationsList conversations={conversations} onClick={onUserClick} selectedUser={userData} />
            }

        </div >
    )
}
export default Messenger;
