import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton/IconButton';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Footer = () => {
    const [currentUser, setCurrentUser] = useState<any>();
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('userData') || '{}'));

    }, [])
    return (<footer>
        <Link to={'/'}>
            <IconButton size="large"
                color="inherit">
                <HomeIcon />
            </IconButton>
        </Link>
        <Link to={'/'}>
            <IconButton size="large"
                color="inherit">
                <VideoLibraryIcon />
            </IconButton>
        </Link>
        <Link to={'/new'}>
            <IconButton size="large"
                color="inherit">
                <AddCircleIcon />
            </IconButton>
        </Link>
        <Link to={'/message'}>
            <IconButton size="large"
                color="inherit">
                <QuestionAnswerIcon />
            </IconButton>
        </Link>
        <Link to={`/${currentUser?.id}`}>
            <IconButton size="large"
                color="inherit">
                <AccountCircleIcon />
            </IconButton>
        </Link>
    </footer>)
}
export default Footer;