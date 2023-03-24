import { IconButton, Icon, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import './post.css';
const Post = ({ caption, images, likes }) => {
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
                <button className="post-profile-pic-button"><img src="https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/205122/49b58aee-bbf0-4be7-ba60-3e9f9a315f09.jpg" /></button>
                <button className="post-profile-name">Pardeep Kashyap</button>
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
                <button className="post-profile-name">Pardeep Kashyap</button>
                <span className="post-caption--text">{caption}</span>
            </div>
        </div>
    </div>)
}

export default Post