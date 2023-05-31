import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material"
import React from "react"
import { useQuery } from "@apollo/client";
import { SEARCH_USER } from "../../gqlOperations/queries"
import Loader from "../Loader/Loader"
import { IUser } from "../../types";

const UserList = ({ onClick, selectedUser, param }: { onClick: any, selectedUser: IUser, param: string }) => {
    const { data, loading } =
        useQuery(SEARCH_USER, {
            variables: { param },
            fetchPolicy: 'no-cache'
        });

    if (loading) return (<Loader />);

    return <div className="chat-users">
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {data && data.userSearch && data.userSearch.map((user: IUser, key: number) => selectedUser?.id !== user?.id ? <ListItem key={key + "_" + Math.random()} alignItems="flex-start" onClick={() => onClick(user)}>
                <ListItemAvatar>
                    <Avatar alt={user.firstName} src={user.userImage} />
                </ListItemAvatar>
                <ListItemText
                    primary={user.firstName + ' ' + user.lastName}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {user.email}
                            </Typography>
                        </React.Fragment>
                    }
                >
                </ListItemText>
            </ListItem> : <></>)}
        </List>
    </div>
}

export default UserList;