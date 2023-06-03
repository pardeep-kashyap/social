import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton/IconButton';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; import { NavLink } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import { AppRouteContant } from '../../constants';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Badge } from '@mui/material';

const Footer = ({ notificationsCount }: { notificationsCount: number }) => {
    const [currentUser, setCurrentUser] = useState<any>();

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('userData') || '{}'));
    }, [])
    return (<footer>
        <NavLink to={AppRouteContant.HOME}>
            <IconButton size="large"
                color="inherit">
                <HomeOutlinedIcon />
            </IconButton>
        </NavLink>
        <NavLink to={'/reel'}>
            <IconButton size="large"
                color="inherit">
                <ExploreOutlinedIcon />
            </IconButton>
        </NavLink>
        <NavLink to={AppRouteContant.NEW}>
            <IconButton size="large"
                color="inherit">
                <ControlPointOutlinedIcon />
            </IconButton>
        </NavLink>
        <NavLink to={AppRouteContant.NOTIFICATION}>
            <IconButton size="large"
                color="inherit">
                <Badge badgeContent={notificationsCount} color="primary">
                    <NotificationsNoneIcon />
                </Badge>
            </IconButton>
        </NavLink>
        <NavLink to={`/${currentUser?.id}`}>
            <IconButton size="large"
                color="inherit">
                <AccountCircleOutlinedIcon />
            </IconButton>
        </NavLink>
    </footer>)
}
export default memo(Footer);