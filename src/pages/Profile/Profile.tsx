import { useQuery } from "@apollo/client";
import { Avatar, Button, Divider, IconButton, Typography, Box } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GET_ALL_POST_BY_USER, GET_USER_BY_ID } from "../../gqlOperations/queries";
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Post from "../../components/Post/Post";
import Settings from "../../components/Setting/Settings";
import Loader from "../../components/Loader/Loader";
import LogoutIcon from '@mui/icons-material/Logout';
import { AppRouteContant } from "../../constants";
import ProfileAction from "../../components/ProfileAction/ProfileAction";
import { IPost, POST_VIEW } from "../../types";
import './Profile.scss';
import PostGrid from "../../components/PostGrid/PostGrid";

const Profile = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const profileId = location.pathname.split('/')[1];
    const loginUserId = localStorage.getItem('id');
    const { data, loading: profileLoading } = useQuery(GET_USER_BY_ID, {
        variables: { userid: profileId },
        fetchPolicy: 'no-cache'
    });
    const { data: userPost, error, loading } = useQuery(GET_ALL_POST_BY_USER, {
        variables: { userid: profileId },
        fetchPolicy: 'no-cache'
    });

    const [selectedPostView, setPostView] = useState(POST_VIEW.ROW)
    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        localStorage.clear();
        navigate(AppRouteContant.SIGNIN);
    }


    if (loading || profileLoading) return (<Loader />)

    return <div className="Profile">
        <div className="Profile--header">
            <div className="Profile--details">
                <div>
                    <Avatar sx={{ width: "85px", height: "85px" }} alt={data?.user.firstName} src={data?.user?.userImage} />
                </div>
                <ProfileAction profile={data?.user} postCount={userPost?.posts?.length} loginUserId={loginUserId} profileId={profileId} />
            </div>
            <div className="Profile--description">
                <div className="Profile--description-name">
                    <span>
                        <Typography variant="body1">
                            {data?.user.firstName} {data?.user.lastName}
                        </Typography>
                        <Box className="pt-1">
                            <Typography variant="caption">
                                {data?.user?.bio}
                            </Typography>
                        </Box>
                    </span>
                </div>
            </div>
        </div>


        <Divider sx={{ marginTop: "var(--gutter)" }}></Divider>
        <div className="Profile--orientation">
            <IconButton size="large"
                color="inherit"
                className={selectedPostView === POST_VIEW.ROW ? 'active' : ''}
                onClick={() => setPostView(POST_VIEW.ROW)}
            >
                <TableRowsIcon />
            </IconButton>
            <IconButton size="large"
                className={selectedPostView === POST_VIEW.GRID ? 'active' : ''}

                color="inherit" onClick={() => setPostView(POST_VIEW.GRID)}>
                <ViewColumnIcon />
            </IconButton>
            <IconButton size="large"
                color="inherit" onClick={() => logout()}>
                <LogoutIcon />
            </IconButton>
        </div>
        <Divider></Divider>
        <div className="profile-post">
            {userPost?.posts.length ? selectedPostView === POST_VIEW.GRID ? <PostGrid posts={userPost?.posts} /> : <RowWisePost posts={userPost?.posts} /> : <div className="new-post"> {localStorage.getItem('id') === profileId ? <Link to={AppRouteContant.NEW}><Button variant="contained">Create New Post</Button></Link> : 'No Post'}  </div>
            }
        </div>
        <Settings
            open={open}
            onClose={handleClose} />
    </div >
}

export default Profile;

export const RowWisePost = ({ posts = [] }: { posts: IPost[] }) => (
    <>
        {posts?.map((post: IPost, index: number) => (
            <div className="post-container" key={index + 'post'} >
                <Post {...post} />
            </div>
        ))}
    </>
)


