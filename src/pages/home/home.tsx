import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_FOLLWER_POST, GET_USER_BY_ID } from "../../gqlOperations/queries";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AppRouteContant } from "../../constants";

const Home = () => {
    const { data, error, loading } = useQuery(GET_FOLLWER_POST, { variables: { userId: localStorage.getItem('id') } })
    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)

    return (
        <div className="post-container">
            {data?.postsByFollower.length ? data?.postsByFollower?.map((quote: any, index: number) => (
                <Post {...quote} key={index + 'post'} />
            )) : <div className="new-post"> <Link to={AppRouteContant.NEW}><Button variant="contained">Create New Post</Button></Link> </div>
            }
        </div >
    )
}
export default Home;