import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_ALL_POST_BY_USER } from "../../gqlOperations/queries";
import './Search.scss'
import { useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import UserList from "../../components/UserList/UserList";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types";

const Search = () => {
    const [input, setInput] = useState<any>('');
    const navigate = useNavigate()

    const onTextChange = (evt: any) => {
        if (evt && evt.target) {
            setInput(evt.target.value);
        }
    }

    const onUserSelection = (user: IUser) => {
        console.log("user", user)
        navigate('/' + user.id)
    }
    return (
        <div className="search-container">
            <SearchInput onChange={onTextChange} value={input} />
            {
                input ? <div className="search-list"><UserList selectedUser={{} as IUser} param={input} onClick={onUserSelection} /></div> : null

            }

        </div >
    )
}
export default Search;