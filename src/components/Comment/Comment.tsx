import { Avatar, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { postAPICall } from "../../apiService";
import { CREATE_NEW_COMMENT } from "../../endPoints";
import { ACTIONTYPE, IUser, NOTIFICATIONTYPE } from "../../types";
import CommentLine from "./CommentLine";
import { useAppStore } from "../../store/zustand";

const Comment = ({ post, refetch }: { post: any, refetch: () => void }) => {
    const [postCommentInProgress, setPostCommentInProgress] = useState(false);
    const [comment, setComment] = useState('');
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
    const saveNotify = useAppStore((state: any) => state.saveNotify);

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
            saveNotify({
                user: currentUser?.id,
                action: NOTIFICATIONTYPE.COMMENT,
                targetUser: post.author,
                item: ACTIONTYPE.POST,
                post: post.id || post._id
            });


        } catch (error) {
            console.log(error);
        }
        setPostCommentInProgress(false)
    }


    return <>
        <div className="comment-section">
            {
                post.commentDetails.map((comment: any, index: number) => <CommentLine postId={post.id || post._id} userId={currentUser.id} refetch={refetch} comment={comment} key={index + '_comment'} />)
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

