import Footer from "../Footer/Footer";
import NavBar from "../NavBar";
import './Layout.scss';

interface layout {
    children: JSX.Element
}
const Layout: React.FC<layout> = ({ children }) => {
    return (<div className="layout">
        <NavBar />
        <main className="layout-container">
            {children}
        </main>
        <Footer />
    </div>)
}

export default Layout;