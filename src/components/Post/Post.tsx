import { IconButton, Icon, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import './Post.css';
import { Link } from "react-router-dom";

interface IPost {
    caption: string;
    images: string[];
    tags: string[];
    author: string;
    postAuthoredDetails: {
        lastName: string;
        firstName: string;
        userImage: string;
    };
    comments: {
        images: string[];
        author: string;
        likes: number;
        text: string;
    }[];
    location: {
        lat: number;
        lng: number;
        name: string;
    };
    likes: string[];
    createdAt: {
        date: Date;
    };
}
const Post = ({ caption, images, likes, postAuthoredDetails, author }: IPost) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (<div className="post">
        <div className="post-header">
            <div className="post-pic-header">
                <Avatar alt={postAuthoredDetails.firstName} className="post-profile-pic-button" src={postAuthoredDetails.userImage} />
                <button className="post-profile-name">
                    <Link to={`/${author}`}>
                        {postAuthoredDetails.firstName} {postAuthoredDetails.lastName}
                    </Link>
                </button>
            </div>
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
                    <Typography textAlign="center">Share</Typography>
                </MenuItem>
            </Menu>
        </div>
        <div className="post-detail">

            {
                images?.map((img: string) => <img src={img} />)
            }
        </div>
        <div className="post-actions">
            <div className="post-pic-header">
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <CommentIcon />
                </IconButton>
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
                {likes.length} likes
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