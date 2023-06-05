import { useQuery } from "react-query";
import { getAPICall } from "../../apiService";
import { FETCH_NOTIFICATION_COUNT } from "../../endPoints";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar";
import { NOTIFICATION_REFATCH_INTERVAL } from "../../constants";
import './Layout.scss';
import { useLocation } from "react-router-dom";

interface layout {
    children: JSX.Element
}

const Layout: React.FC<layout> = ({ children }) => {
    const location = useLocation();
    const { data: notificationsCount } = useQuery({
        queryFn: () => getAPICall(FETCH_NOTIFICATION_COUNT, {}),
        queryKey: 'notificationCount',
        refetchInterval: NOTIFICATION_REFATCH_INTERVAL
    })
    return (<div className="layout">
        <NavBar />
        <main className="layout-container">
            {children}
        </main>
        {
            !location.pathname.includes('/chat') && <Footer notificationsCount={notificationsCount} />
        }

    </div>)
}

export default Layout;