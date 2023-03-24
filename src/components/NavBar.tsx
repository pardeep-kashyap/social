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
            {
                location.pathname === '/' ? <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    className="more-icon"
                    onClick={() => navigate('/new')}
                >
                    <AddBoxIcon />
                </IconButton> : <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => navigate('/')}
                >
                    <ArrowBackIcon />
                </IconButton>
            }


            <span className='logo'>
                GlowNet
            </span>
            {
                location.pathname !== '/message' ?
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        className="more-icon"
                        onClick={() => navigate('/message')}
                    >
                        <ChatBubbleOutlineIcon />
                    </IconButton> : <span>&nbsp;&nbsp;</span>
            }
        </header>
    );
}
export default NavBar;
