import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRouteContant } from '../../constants';
import ExploreIcon from '@mui/icons-material/Explore';
const Footer = () => {
    const [currentUser, setCurrentUser] = useState<any>();
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('userData') || '{}'));

    }, [])
    return (<footer>
        <NavLink to={AppRouteContant.HOME}>
            <IconButton size="large"
                color="inherit">
                <HomeIcon />
            </IconButton>
        </NavLink>
        <NavLink to={'/reel'}>
            <IconButton size="large"
                color="inherit">
                <ExploreIcon />
            </IconButton>
        </NavLink>
        <NavLink to={AppRouteContant.NEW}>
            <IconButton size="large"
                color="inherit">
                <AddCircleIcon />
            </IconButton>
        </NavLink>
        <NavLink to={AppRouteContant.MESSAGE}>
            <IconButton size="large"
                color="inherit">
                <QuestionAnswerIcon />
            </IconButton>
        </NavLink>
        <NavLink to={`/${currentUser?.id}`}>
            <IconButton size="large"
                color="inherit">
                <AccountCircleIcon />
            </IconButton>
        </NavLink>
    </footer>)
}
export default Footer;