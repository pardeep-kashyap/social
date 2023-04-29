import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GETALLPOST } from "../../gqlOperations/queries";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AppRouteContant } from "../../constants";
import Search from "../Search/Search";

const Reel = () => {
    const { data, error, loading } = useQuery(GETALLPOST)
    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)

    return (
        <div className="post-container">
            <Search />

            {data?.allPost.length ? data?.allPost?.map((quote: any, index: number) => (
                <Post {...quote} key={index + 'post'} />
            )) : <div className="new-post"> <Link to={AppRouteContant.NEW}><Button variant="contained">Create New Post</Button></Link> </div>
            }
        </div >
    )
}
export default Reel;