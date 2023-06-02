import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_POST_BY_ID } from "../../gqlOperations/queries";
import './PostDetail.scss'
import Comment from "../../components/Comment/Comment";

const PostDetail = () => {
    const postId = location.pathname.split('/')[2];

    const { data, error, loading, refetch } = useQuery(GET_POST_BY_ID, {
        variables: { postId: postId },
        fetchPolicy: 'no-cache'
    })



    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)


    return (
        <div className="post-details">
            {
                data.post &&
                <Post {...data.post} key={'post'} />
            }
            <Comment post={data.post} refetch={() => refetch()} />
        </div >
    )
}
export default PostDetail;