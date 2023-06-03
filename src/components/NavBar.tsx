import IconButton from '@mui/material/IconButton';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppRouteContant } from '../constants';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import './NavBar.scss';
function NavBar() {
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <header className='NavBar'>
            <div>
                {
                    location.pathname === AppRouteContant.HOME ? <div></div> : <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon />
                    </IconButton>}
            </div>

            <div>
                <img className='logo' src='/logo.png' />
            </div>
            <div>
                {
                    location.pathname === AppRouteContant.HOME && <NavLink to={AppRouteContant.MESSAGE}>
                        <IconButton size="large"
                            color="inherit">
                            <QuestionAnswerOutlinedIcon />
                        </IconButton>
                    </NavLink>
                }

            </div>
        </header>
    );
}
export default NavBar;
