import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './NavBar.css';
function NavBar() {
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <header className='NavBar'>
            {/* {
                location.pathname === '/' ? <div></div> : <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => navigate('/')}
                >
                    <ArrowBackIcon />
                </IconButton>
            } */}
            <img className='logo' src='/logo.png' />
        </header>
    );
}
export default NavBar;
