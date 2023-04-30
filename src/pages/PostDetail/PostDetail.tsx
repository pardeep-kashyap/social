import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_POST_BY_ID } from "../../gqlOperations/queries";
import './PostDetail.scss'

const PostDetail = () => {
    const postId = location.pathname.split('/')[2];
    const { data, error, loading } = useQuery(GET_POST_BY_ID, { variables: { postId: postId } })

    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)

    return (
        <div className="post-container">
            {
                data.post &&
                <Post {...data.post} key={'post'} />
            }
        </div >
    )
}
export default PostDetail;