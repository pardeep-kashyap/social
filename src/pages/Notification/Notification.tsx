import Loader from "../../components/Loader/Loader";
import { useState, useRef, useCallback, useEffect, memo } from "react";
import { ClipLoader } from "react-spinners";
import { INotification, NOTIFICATIONTYPE } from "../../types";
import { List, ListItem, ListItemAvatar, Avatar, Button } from "@mui/material";
import { timeSinceText } from "../../util";
import { useMutation, useQuery } from "react-query";
import { FETCH_NOTIFICATION, MARK_AS_READ_NOTIFICATION } from "../../endPoints";
import { getAPICall } from "../../apiService";
import './Notification.scss';
import { useNavigate } from "react-router-dom";
import { AppRouteContant } from "../../constants";

const limit = 8;
const Notification = () => {
    console.log("Notification");
    const homepageRef = useRef<any>(null);
    const [moreLoading, setMoreLoading] = useState(false);
    const [limitReached, setLimitReached] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const { data: notifications, isError, isLoading } = useQuery({
        queryKey: 'FETCH_NOTIFICATION',
        enabled: !isFetched,
        queryFn: () => getAPICall(FETCH_NOTIFICATION, {}),
        onSuccess: () => {
            setIsFetched(true);
        }
    })

    useEffect(() => {
        (async () => {
            await getAPICall(MARK_AS_READ_NOTIFICATION, {})
        })()

    }, [])

    const fetchMoreFollowerPost = async () => {
        console.log("fetchMoreFollowerPost");
        setMoreLoading(true)
        try {
            // refetch();
            // setMoreLoading(false);
            // setNotification([...notifications, ...data]);
            // setLimitReached(!(data.length > 0))
        } catch (e) {
            console.log(e)
        }
        setMoreLoading(false)
    }

    const onScroll = (evt: any) => {
        if (limitReached) {
            return
        }
        if (homepageRef.current && homepageRef.current.scrollTop + homepageRef.current.clientHeight >= (homepageRef.current.scrollHeight - 100) && !moreLoading) {
            console.log('Scrolled to the bottom', notifications?.length);
            // fetchMoreFollowerPost();
        }
    }



    if (isLoading) return (<Loader />)
    if (isError) return (<div>`Error! `;</div>)
    return (
        <div ref={homepageRef} className="notification-container" onScroll={onScroll}>
            {notifications && notifications.length > 0 && <div className="chat-users">
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {notifications.map((notification: INotification, key: number) => {
                        return <ListItem sx={{ backgroundColor: notification.isUnread ? 'lightgray' : '', cursor: 'pointer' }} key={key + "_" + Math.random()} alignItems="flex-start" >
                            <ListItemAvatar>
                                <Avatar alt={notification?.user?.firstName} src={notification?.user?.userImage} />
                            </ListItemAvatar>
                            <NotificationItem notification={notification} />

                        </ListItem>
                    })}
                </List>
            </div>}
            {
                moreLoading && <div className="flex justify-center p-2">
                    <ClipLoader color="var(--theme)" aria-label="Loading Spinner"
                        data-testid="loader" size={30}
                    />
                </div>
            }
        </div >
    )
}
export default memo(Notification);

const NotificationItem = ({ notification }: { notification: INotification }) => {
    const navigate = useNavigate();

    const getTime = useCallback(() => {
        return notification.createdAt ? timeSinceText(new Date(notification.createdAt)) : null
    }, [notification])

    const notificationClick = () => {

        switch (notification.action) {
            case NOTIFICATIONTYPE.LIKE:
            case NOTIFICATIONTYPE.COMMENT:
                navigate(`${AppRouteContant.POST_DETAIL}/${notification.post._id}`)
                break;
            case NOTIFICATIONTYPE.FOLLOW:
                navigate(`/${notification.user._id}`);
                break;
        }
    }

    return <button className="notification-list-item" onClick={() => notificationClick()}>
        <pre>
            <span className="notification-auther">
                {notification?.user?.firstName + ' ' + notification?.user?.lastName}
            </span>
            {notificationType[notification.action]}
            {itemType[notification.item]}
            <span className="time"> <span className="dot"> • </span><span className="text">{getTime()}</span></span>
        </pre>
        {[1, 2].includes(notification.item) ? <img className="notification-auther-image" src={notification?.post?.images[0]} /> : null}

    </button>
}

const notificationType: any = {
    1: ' liked your',
    2: ' commneted on your',
    3: ' started Following you',
}
const itemType: any = {
    1: ' Post',
    2: ' Comment',
}


