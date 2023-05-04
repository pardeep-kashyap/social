import { useQuery } from "@apollo/client";
import { Avatar, Button, Divider, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GET_ALL_POST_BY_USER, GET_USER_BY_ID } from "../../gqlOperations/queries";
import './Profile.scss';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Post from "../../components/Post/Post";
import Settings from "../../components/Setting/Settings";
import Loader from "../../components/Loader/Loader";
import LogoutIcon from '@mui/icons-material/Logout';
import { getAPICall } from "../../apiService";
import { FOLLOW_USER, UN_FOLLOW_USER } from "../../endPoints";
import { AppRouteContant } from "../../constants";

const Profile = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const profileId = location.pathname.split('/')[1];
    const loginUserId = localStorage.getItem('id');
    const { data, loading: profileLoading } = useQuery(GET_USER_BY_ID, { variables: { userid: profileId } });
    const { data: userPost, error, loading } = useQuery(GET_ALL_POST_BY_USER, { variables: { userid: profileId } })
    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        localStorage.clear();
        navigate(AppRouteContant.SIGNIN)
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
                    </span>
                </div>
            </div>
        </div>


        <Divider sx={{ marginTop: "var(--gutter)" }}></Divider>
        <div className="Profile--orientation">
            <IconButton size="large"
                color="inherit">
                <TableRowsIcon />
            </IconButton>
            <IconButton size="large"
                color="inherit">
                <ViewColumnIcon />
            </IconButton>
            <IconButton size="large"
                color="inherit" onClick={() => logout()}>
                <LogoutIcon />
            </IconButton>
        </div>
        <Divider></Divider>
        <div className="profile-post">
            {userPost?.posts.length ? userPost?.posts?.map((post: any, index: number) => (
                <Post {...post} key={index + '_post'} />
            )) : <div className="new-post"> {localStorage.getItem('id') === profileId ? <Link to={AppRouteContant.NEW}><Button variant="contained">Create New Post</Button></Link> : 'No Post'}  </div>
            }
        </div>
        <Settings
            open={open}
            onClose={handleClose} />
    </div >
}

export default Profile;


const ProfileAction = (props: any) => {
    const { loginUserId, profileId, profile, postCount } = props;
    const [profileDetails, setProfileDetails] = useState(profile);

    const onFollow = async () => {
        const user = await getAPICall(
            `${FOLLOW_USER}/${profileId}`, {}
        )
        setProfileDetails(user);
    }

    const onUnFollow = async () => {
        const user = await getAPICall(
            `${UN_FOLLOW_USER}/${profileId}`, {}
        );
        setProfileDetails(user);
    }

    const toggleFollowUnFollow = () => {
        if (profileDetails?.followers?.includes(loginUserId)) {
            onUnFollow();
        } else {
            onFollow();
        }
    }
    return (
        <div className="w-full">
            <div className="profile-stats">
                <div >
                    <p>{postCount}</p>
                    <p>Post</p>
                </div>
                <div>
                    <p>{profileDetails?.followers?.length}</p>
                    <p>Follower</p>
                </div>

                <div>
                    <p>{profileDetails?.following?.length}</p>
                    <p>Following</p>
                </div>

            </div>
            <div className="profile-action">
                {
                    loginUserId === profileId ?
                        <Button variant="outlined">Edit Profile</Button> : <><Button onClick={toggleFollowUnFollow} variant="outlined">{profileDetails?.followers?.includes(loginUserId) ? 'UnFollow' : 'Follow'}</Button>
                            <Link to={AppRouteContant.MESSAGE}><Button variant="outlined">Message</Button></Link>  </>
                }
            </div>

        </div>

    )
}