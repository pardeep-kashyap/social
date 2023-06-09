import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAPICall, postAPICall } from "../../apiService";
import { AppRouteContant } from "../../constants";
import { CREATE_CONVERSATION, FOLLOW_USER, UN_FOLLOW_USER } from "../../endPoints";
import { useAppStore } from "../../store/zustand";
import { NOTIFICATIONTYPE } from "../../types";

const ProfileAction = (props: any) => {
    const { loginUserId, profileId, profile, postCount } = props;
    const [profileDetails, setProfileDetails] = useState(profile);
    const saveNotify = useAppStore((state: any) => state.saveNotify);
    const navigate = useNavigate();
    const onFollow = async () => {
        const user = await getAPICall(
            `${FOLLOW_USER}/${profileId}`, {}
        )
        saveNotify({
            user: loginUserId,
            action: NOTIFICATIONTYPE.FOLLOW,
            targetUser: profileId,
        });
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
    const onMessageClick = async () => {
        await postAPICall({
            baseUrl: CREATE_CONVERSATION,
            body: {
                users: [profileId, loginUserId]
            }
        });
        navigate(`/chat/${profileId}`);
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
                        <Link to={AppRouteContant.SETUP_PROFILE} state={profile}>   <Button variant="outlined">Edit Profile</Button> </Link> : <><Button onClick={toggleFollowUnFollow} variant="outlined">{profileDetails?.followers?.includes(loginUserId) ? 'UnFollow' : 'Follow'}</Button>
                            <Button variant="outlined" onClick={onMessageClick}>Message</Button>  </>
                }
            </div>

        </div >

    )
}
export default ProfileAction;