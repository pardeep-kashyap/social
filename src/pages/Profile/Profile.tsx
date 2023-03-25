import { useQuery } from "@apollo/client";
import { Avatar, Card, Divider, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ALL_POST_BY_USER, GET_USER_BY_ID } from "../../gqlOperations/queries";
import './Profile.css';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Post from "../../components/Post/Post";
const Profile = () => {
    const location = useLocation();
    const { data } = useQuery(GET_USER_BY_ID, { variables: { userid: location.pathname.split('/')[1] } });
    const { data: userPost, error, loading } = useQuery(GET_ALL_POST_BY_USER, { variables: { userid: localStorage.getItem('id') } })


    return <div className="Profile">
        <div className="Profile--details">
            <Avatar sx={{ width: "150px", height: "150px" }} alt={data?.user.firstName} src={data?.user.profileImage} />
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
        </div>
        <Divider></Divider>
        <div>
            {userPost?.posts.length ? userPost?.posts?.map((post: any, index: number) => (
                <Post {...post} key={index + 'post'} />
            )) : <div style={{ textAlign: 'center' }}>Create New Post</div>
            }
        </div>
    </div >
}

export default Profile;