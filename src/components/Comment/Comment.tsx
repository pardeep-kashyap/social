import { Avatar, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { postAPICall, putAPICall } from "../../apiService";
import { CREATE_NEW_COMMENT, UPDATE_COMMENT } from "../../endPoints";
import { IUser } from "../../types";
import CommentLine from "./CommentLine";

const Comment = ({ post, refetch }: any) => {
    const [postCommentInProgress, setPostCommentInProgress] = useState(false);
    const [comment, setComment] = useState('');
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData') || '{}') as IUser;
        setCurrentUser(user);
    }, []);

    const addNewComment = async (evt: any) => {
        evt.preventDefault();
        setPostCommentInProgress(true)
        try {
            const body = {
                text: comment,
                author: currentUser?.id,
                postId: post._id
            };
            await postAPICall({ baseUrl: `${CREATE_NEW_COMMENT}`, body: body });
            setComment('')
            refetch();

        } catch (error) {
            console.log(error);
        }
        setPostCommentInProgress(false)
    }


    return <>
        <div className="comment-section">
            {
                post.commentDetails.map((comment: any, index: number) => <CommentLine userId={currentUser.id} refetch={refetch} comment={comment} key={index + '_comment'} />)
            }
            <form className="add-new-comment" onSubmit={addNewComment}>
                <div className="comment-text-section">
                    <Avatar alt={currentUser.firstName} className="post-profile-pic-button" src={currentUser.userImage} />
                    <input required name="comment" type="text" value={comment} onChange={(evt) => setComment(evt.target.value)} placeholder="Add a comment..." />
                </div>

                {postCommentInProgress ? <CircularProgress sx={{ margin: 'auto', marginRight: 'var(--gutter)' }} size={20} thickness={1} /> : <button type="submit" >Post</button>}
            </form>
        </div>
    </>

}

export default Comment;

