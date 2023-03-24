import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton/IconButton';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Footer = () => {
    return (<footer>
        <IconButton size="large"
            color="inherit">
            <HomeIcon />
        </IconButton>
        <IconButton size="large"
            color="inherit">
            <VideoLibraryIcon />
        </IconButton>
        <IconButton size="large"
            color="inherit">
            <AddCircleIcon />
        </IconButton>
        <IconButton size="large"
            color="inherit">
            <QuestionAnswerIcon />
        </IconButton>
        <IconButton size="large"
            color="inherit">
            <AccountCircleIcon />
        </IconButton>
    </footer>)
}
export default Footer;