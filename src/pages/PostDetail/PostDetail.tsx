import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_POST_BY_ID } from "../../gqlOperations/queries";
import './PostDetail.scss'
import { useState } from "react";
import { postAPICall } from "../../apiService";
import { CREATE_NEW_COMMENT } from "../../endPoints";
import { Avatar, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const PostDetail = () => {
    const postId = location.pathname.split('/')[2];
    const userId = localStorage.getItem('id');

    const { data, error, loading } = useQuery(GET_POST_BY_ID, { variables: { postId: postId } })
    const [postCommentInProgress, setPostCommentInProgress] = useState(false);
    const [comment, setComment] = useState('');

    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)

    const addNewComment = async (evt: any) => {
        evt.preventDefault();
        setPostCommentInProgress(true)
        try {
            const body = {
                text: 'My Commnet',
                author: userId,
                postId: postId
            };
            const response = await postAPICall({ baseUrl: `${CREATE_NEW_COMMENT}`, body: body });
            setComment('')
        } catch (error) {
            console.log(error);
        }
        setPostCommentInProgress(false)
    }

    return (
        <div className="post-container">
            {
                data.post &&
                <Post {...data.post} key={'post'} />
            }
            <div>

                {
                    data.post.commentDetails.map((comment: any) => <div className="add-new-comment" ><div>
                        <Avatar alt={comment.author.firstName} className="post-profile-pic-button" src={comment.author.userImage} />
                        <div className="comment-text">
                            <button className="post-profile-name">
                                <Link to={`/${comment.author.id}`}>
                                    {comment.author.firstName} {comment.author.lastName}
                                </Link>
                            </button>
                            <span>{comment.text}</span>
                        </div>
                    </div>
                    </div>
                    )
                }

                <form className="add-new-comment" onSubmit={addNewComment}>
                    <div>
                        <Avatar alt={data.post.author.firstName} className="post-profile-pic-button" src={data.post.author.userImage} />

                        <input required name="comment" type="text" value={comment} onChange={(evt) => setComment(evt.target.value)} placeholder="Add a comment..." />

                    </div>

                    {postCommentInProgress ? <CircularProgress sx={{ margin: 'auto', marginRight: 'var(--gutter)' }} size={20} thickness={1} /> : <button type="submit" >Post</button>}
                </form>
            </div>
        </div >
    )
}
export default PostDetail;