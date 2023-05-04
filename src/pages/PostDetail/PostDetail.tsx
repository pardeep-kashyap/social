import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_POST_BY_ID } from "../../gqlOperations/queries";
import './PostDetail.scss'
import { useState } from "react";
import { postAPICall, putAPICall } from "../../apiService";
import { CREATE_NEW_COMMENT, UPDATE_COMMENT } from "../../endPoints";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostDetail = () => {
    const postId = location.pathname.split('/')[2];
    const userId = localStorage.getItem('id');

    const { data, error, loading, refetch } = useQuery(GET_POST_BY_ID, { variables: { postId: postId } })
    const [postCommentInProgress, setPostCommentInProgress] = useState(false);
    const [comment, setComment] = useState('');

    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)

    const addNewComment = async (evt: any) => {
        evt.preventDefault();
        setPostCommentInProgress(true)
        try {
            const body = {
                text: comment,
                author: userId,
                postId: postId
            };
            const response = await postAPICall({ baseUrl: `${CREATE_NEW_COMMENT}`, body: body });
            setComment('')
            refetch();

        } catch (error) {
            console.log(error);
        }
        setPostCommentInProgress(false)
    }

    const toggleCommentLike = async (comment: any) => {
        const body = JSON.parse(JSON.stringify(comment));
        try {
            if (body.likes.includes(userId)) {
                body.likes.splice(body.likes.indexOf(userId), 1)
            } else {
                body.likes.push(userId)
            }
            body.author = body.author.id
            const response = await putAPICall({ baseUrl: `${UPDATE_COMMENT}`, body: body });
            refetch();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="post-container">
            {
                data.post &&
                <Post {...data.post} key={'post'} />
            }
            <div className="comment-section">

                {
                    data.post.commentDetails.map((comment: any) => <div className="add-new-comment" ><div className="commet-container">
                        <div className="comment-text-section">
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


                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => toggleCommentLike(comment)}
                        >
                            {
                                comment?.likes?.includes(userId) ? <FavoriteIcon /> : <FavoriteBorderIcon />
                            }

                        </IconButton>
                    </div>
                    </div>
                    )
                }

                <form className="add-new-comment" onSubmit={addNewComment}>
                    <div className="comment-text-section">
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