import { useQuery } from "@apollo/client";
import { Avatar, Card, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ALL_POST_BY_USER, GET_USER_BY_ID } from "../../gqlOperations/queries";
import './Profile.css';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import SettingsIcon from '@mui/icons-material/Settings';
import Post from "../../components/Post/Post";
import Settings from "../../components/Setting/Settings";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const { data, loading: profileLoading } = useQuery(GET_USER_BY_ID, { variables: { userid: location.pathname.split('/')[1] } });
    const { data: userPost, error, loading } = useQuery(GET_ALL_POST_BY_USER, { variables: { userid: localStorage.getItem('id') } })
    const handleClose = () => {
        setOpen(false);
    };

    if (loading || profileLoading) return (<Loader />)

    return <div className="Profile">
        <div className="Profile--details">
            <Avatar sx={{ width: "150px", height: "150px" }} alt={data?.user.firstName} src={data?.user.userImage} />
            <div >
                <span>
                    <Typography variant="body1">
                        {data?.user.firstName} {data?.user.lastName}
                    </Typography>
                </span>
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
                color="inherit" onClick={() => setOpen(true)}>
                <SettingsIcon />
            </IconButton>
        </div>
        <Divider></Divider>
        <div>
            {userPost?.posts.length ? userPost?.posts?.map((post: any, index: number) => (
                <Post {...post} key={index + 'post'} />
            )) : <div style={{ textAlign: 'center' }}>Create New Post</div>
            }
        </div>
        <Settings
            open={open}
            onClose={handleClose} />
    </div >
}

export default Profile;