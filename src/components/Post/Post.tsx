import { IconButton, Menu, MenuItem, Button } from "@mui/material"
import { useCallback, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import './Post.scss';
import { Link } from "react-router-dom";
import { putAPICall } from "../../apiService";
import { DELETE_POST_API, UPDATE_POST_API } from "../../endPoints";
import { ACTIONTYPE, IPost, NOTIFICATIONTYPE } from "../../types";
import { remove } from "../../apiService";
import { timeSinceText } from "../../util";
import { useNotificationStore } from "../../store/zustand";

const Post = ({ caption, images, comments, likes, postAuthoredDetails, author, _id, createdAt }: IPost) => {
    const userId = localStorage.getItem('id');
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [isLiked, setIsLiked] = useState(likes.includes(localStorage.getItem('id') as string));
    const [likesLocal, setLikes] = useState(likes);
    const [isDeleted, setDeleted] = useState(false);
    const saveNotify = useNotificationStore((state: any) => state.saveNotify);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const toggleLike = () => {
        let likes: string[] = [];
        if (!isLiked) {
            likes = [...likesLocal, userId as string]
        } else {
            likes = [...likesLocal];
            likes.splice(likes.indexOf(userId as string), 1);
        }
        setIsLiked(!isLiked);
        (async () => {
            try {
                const response = await putAPICall({ baseUrl: `${UPDATE_POST_API}/${_id}`, body: { likes } });

                if (response && response.data && response.data.likes) {
                    setLikes(response.data.likes);
                    if (response.data.likes.includes(userId)) {
                        saveNotify({
                            user: userId,
                            action: NOTIFICATIONTYPE.LIKE,
                            targetUser: author,
                            item: ACTIONTYPE.POST,
                            post: _id
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }
    const deletePost = () => {
        (async () => {
            try {
                await remove({ baseUrl: `${DELETE_POST_API}/${_id}` });
                console.log('response');
                setDeleted(true)
            } catch (error) {
                console.log(error);
            }
        })()
    }

    const getTime = useCallback(() => {
        return timeSinceText(new Date(Number(createdAt)))
    }, [createdAt])

    return (<div className={`post ${isDeleted && 'deleted'}`} >

        <div className="post-header">
            <div className="post-pic-header">
                <Avatar alt={postAuthoredDetails.firstName} className="post-profile-pic-button" src={postAuthoredDetails.userImage} />


                <button className="post-profile-name">
                    <Link to={`/${author}`}>
                        {postAuthoredDetails.firstName} {postAuthoredDetails.lastName}
                    </Link>
                </button>
                <span className="time">
                    <span className="dot"> • </span><span className="text">{getTime()}</span>
                </span>
            </div>

            {
                userId === author &&
                <>
                    <div className="more-icon">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            className="more-icon"
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        <MenuItem key={1} onClick={handleCloseNavMenu}>
                            <Button onClick={() => deletePost()}>Delete</Button>
                        </MenuItem>

                    </Menu>
                </>

            }
        </div>
        <div className="post-detail">
            {
                images?.map((img: string, index: number) => <img key={index + _id + '_post'} src={img} />)
            }
        </div>
        <div className="post-actions">
            <div className="post-pic-header">
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={toggleLike}
                >
                    {
                        isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />
                    }

                </IconButton>
                <Link to={`post/${_id}`}>
                    <IconButton
                        size="large"
                        color="inherit"
                        className="comment"
                    >
                        <CommentIcon />
                    </IconButton>
                    <span> {comments.length > 0 && comments.length} Comment</span>

                </Link>

            </div>
            <div className="more-icon">
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <BookmarkBorderIcon />
                </IconButton>

            </div>
        </div>
        <div className="post-bottom-details">
            <div className="post-likes">
                {likesLocal.length} Likes
            </div>
            <div className="post-caption">
                <button className="post-profile-name">
                    <Link to={`/${author}`}>
                        {postAuthoredDetails.firstName} {postAuthoredDetails.lastName}
                    </Link>
                </button>
                <span className="post-caption--text">{caption}</span>
            </div>
        </div>


    </div>)
}

export default Post