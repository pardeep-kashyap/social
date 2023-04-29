import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRouteContant } from '../../constants';
const Protected = ({ children }: { children: any }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate(AppRouteContant.SIGNIN);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <>
            {
                isLoggedIn ? children : null
            }
        </>
    );;
};
export default Protected;
