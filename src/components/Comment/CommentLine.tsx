import { Avatar, IconButton } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { putAPICall } from "../../apiService";
import { UPDATE_COMMENT } from "../../endPoints";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { timeSinceText } from "../../util";

const CommentLine = ({ comment, userId, refetch }: any) => {
    console.log("comment", comment)
    const [isLiked, setLiked] = useState(false);

    const toggleCommentLike = async (comment: any) => {
        const body = JSON.parse(JSON.stringify(comment));
        try {
            if (body.likes.includes(userId)) {
                body.likes.splice(body.likes.indexOf(userId), 1)
            } else {
                body.likes.push(userId)
            }
            body.author = body.author.id
            setLiked(!isLiked);
            const response = await putAPICall({ baseUrl: `${UPDATE_COMMENT}`, body: body });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLiked(comment?.likes?.includes(userId));
    }, [userId]);

    const getTime = useCallback(() => {
        return timeSinceText(new Date(Number(comment.createdAt)))
    }, [comment.createdAt])

    return <div className="add-new-comment"><div className="commet-container">
        <div className="comment-text-section">
            <Avatar alt={comment.author.firstName} className="post-profile-pic-button" src={comment.author.userImage} />
            <div className="comment-text">
                <button className="post-profile-name">
                    <Link to={`/${comment.author.id}`}>
                        {comment.author.firstName} {comment.author.lastName}
                    </Link>
                </button>
                <span>{comment.text}</span>
                <span className="time">
                    {comment?.likes.length} Like{comment?.likes.length > 1 && 's'}  <span className="dot"> • </span><span className="text">{getTime()}</span>
                </span>
            </div>

        </div>


        <IconButton
            size="large"
            color="inherit"
            onClick={() => toggleCommentLike(comment)}
        >
            {
                isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />
            }

        </IconButton>
    </div>
    </div>
}

export default CommentLine;