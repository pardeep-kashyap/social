import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const UnProtected = ({ children }: { children: any }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (userToken && userToken !== 'undefined') {
            setIsLoggedIn(true);
            return navigate('/');
        }
        setIsLoggedIn(false);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <>
            {
                !isLoggedIn ? children : null
            }
        </>
    );;
};
export default UnProtected;
