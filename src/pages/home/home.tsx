import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_ALL_POST_BY_USER } from "../../gqlOperations/queries";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AppRouteContant } from "../../constants";

const Home = () => {
    const { data, error, loading } = useQuery(GET_ALL_POST_BY_USER, { variables: { userid: localStorage.getItem('id') } })
    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)

    return (
        <div className="post-container">
            {data?.posts.length ? data?.posts?.map((quote: any, index: number) => (
                <Post {...quote} key={index + 'post'} />
            )) : <div className="new-post"> <Link to={AppRouteContant.NEW}><Button variant="contained">Create New Post</Button></Link> </div>
            }
        </div >
    )
}
export default Home;